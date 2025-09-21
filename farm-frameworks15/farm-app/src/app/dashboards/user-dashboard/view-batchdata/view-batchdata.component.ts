
import { Component, OnInit } from "@angular/core"
import { purchaseArray } from "src/app/models/purchase.model"
import { Location } from "@angular/common"
import { PurchaseService } from "src/app/services/purchase.service"
import { ActivatedRoute, Router } from "@angular/router"
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: "app-viewBatchdata",
    templateUrl: "./view-batchdata.component.html",
    styleUrls: ["./view-batchdata.component.css"]
})

export class ViewBatchData implements OnInit {

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
}