
import { Component, OnInit, AfterViewInit } from "@angular/core"
import { purchaseArray } from "src/app/models/purchase.model"
import { Location } from "@angular/common"
import { PurchaseService } from "src/app/services/purchase.service"
import { ActivatedRoute, Router } from "@angular/router"
import { NzMessageService } from 'ng-zorro-antd/message';
import * as AOS from 'aos';

@Component({
    selector: "app-viewBatchdata",
    templateUrl: "./view-batchdata.component.html",
    styleUrls: ["./view-batchdata.component.css"]
})

export class ViewBatchData implements OnInit, AfterViewInit {

    currentDate: Date = new Date()
    intervalId: any
    loader: boolean = false
    purchaseErrorMessage: string = ''
    successMessage: string = ''
    // isLoading: boolean = false
    purchases: purchaseArray[] = []
    batchId: string = ""

    constructor(
        private location: Location,
        private purchaseService: PurchaseService,
        private route: ActivatedRoute,
        private message: NzMessageService,
        private router: Router
    ){}

    ngOnInit(): void {
        this.batchId = this.route.snapshot.paramMap.get("batchId") || ""
        if(this.batchId){
            this.loader = true
            this.purchaseService.getPurchasesByBatchId(this.batchId).subscribe({
                next: (res) => {
                    this.purchases = res.data
                    this.loader = false
                }, error: (err) => {
                    console.error(err)
                    this.purchaseErrorMessage = err.error?.message || "Failed to fetch purchases. Please try again.";
                    this.loader = false
                }
            })
        }

        this.intervalId = setInterval(() => {
            this.currentDate = new Date()
        },1000)
    }
    ngAfterViewInit(): void {
        AOS.init({
          duration: 800, // animation duration (ms)
          easing: 'ease-in-out-quart', // natural easing
          once: false, // animate again when scrolling up
          mirror: true // re-trigger when scrolling back up
        });
    }
    ngOnDestroy(): void {
        if(this.intervalId){
            clearInterval(this.intervalId)
        }
    }


    confirm(batchId: string): void {
        this.message.success("Navigating to view all records for this batch...")
        this.router.navigate(["/vaccine", batchId])
    }

    goBack():void{
        this.location.back()
    }
    cancel(): void {
        this.message.info('Action cancelled');
    }

    getAosDelay(index: number): number {
        return (index % 4) * 150; // delays 0, 150, 300, 450ms
    }

    getAosEffect(index: number): string {
        const effects = ['fade-up', 'zoom-in', 'flip-left', 'fade-right', 'fade-down', 'zoom-out', 'flip-up'];
        return effects[index % effects.length];
    }
}