
import { HttpClient } from "@angular/common/http"
import { Component, OnInit } from "@angular/core"
import { NgForm } from "@angular/forms"
import { BatchModel, BatchData, BatchResponse } from "src/app/models/batch.model"
import { BatchService } from "src/app/services/batch.service"
import { Location } from "@angular/common"
import { BatchSelectionService } from "src/app/services/batch-selection.service"
import { Router } from "@angular/router"
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'app-create-batch',
    templateUrl: './create-batch.component.html',
    styleUrls: ['./create-batch.component.css']
})

export class CreateBatchRecords implements OnInit {
    currentDate: Date = new Date()
    intervalId: any
    loader: boolean = true
    
    constructor(
        private http: HttpClient,
        private batchService: BatchService,
        private location: Location,
        private batchSelectionService: BatchSelectionService,
        private router: Router,
        private message: NzMessageService
    ){}


    ngOnInit(): void {
        this.loader = true
        const userData = localStorage.getItem("user")
        if(userData){
            try {
                const parsedUser = JSON.parse(userData)
                this.batchInput.userId = parsedUser.id || parsedUser._id

                this.loadUserBatches(this.batchInput.userId)

            } catch(err){
                console.log("error passing user from localstorage", err)
                this.loader = false
            }
        } else{
            this.loader = false
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

    batchInput: BatchModel = new BatchModel("","","")
    errorMessage: string = ''
    batchErrorMessage: string = ''
    successMessage: string = ''
    isLoading: boolean = false
    batches: BatchData[] = []


    loadUserBatches(userId: string){
        this.loader = true
        this.batchService.getallbatchbyuser(userId).subscribe({
            next: (res: BatchData[]) => {
                this.batches = res
                this.loader = false
                // console.info("batchdata fetched successfully: ", res)
            }, error:(err) => {
                this.batchErrorMessage = err.error?.message || "Failed to fetch batches"
                this.loader = false
            }
        })
    }

    selectBatch(batch: BatchData){
        this.batchSelectionService.setSelectedBatch(batch)
        localStorage.setItem('selectedBatch', JSON.stringify(batch))
        this.router.navigate(["/admin-dashboard"])
    }

    submitForm(form: NgForm){
        this.isLoading = true
        this.successMessage = ''
        this.errorMessage = ''
        if(form.invalid){
            this.isLoading = false
            this.successMessage = ''
            this.errorMessage = "Invalid form credentials"
            // console.log("form is invalid ")
            return
        }
        this.isLoading = true
        console.log('form is perfect: ', form.value)
        this.batchService.createBatch(this.batchInput).subscribe({
            next: (res: BatchResponse) => {
                console.log("batch created: ", res)
                this.isLoading = false
                this.successMessage = res.message
                this.loadUserBatches(this.batchInput.userId)

                // reset form but keep userId intact
                const userId = this.batchInput.userId
                form.resetForm()
                this.batchInput = new BatchModel("","", userId)
            },


            error: (err) => {
                this.isLoading = false
                this.errorMessage = err.error.message || 
                "Something went wrong while creating the batch.";
                console.error("error creating batch record: ", err)
            }
        })
    }
    goBack():void{
        this.location.back()
    }

    confirm(batchId: string): void {
        this.batchService.deleteBatchById(batchId).subscribe({
            next: (res) => {
                this.message.success(res.message || 'Batch Deleted!');
                this.loadUserBatches(this.batchInput.userId)
            }, error: (err) => {
                this.message.error(err.error?.message || "Failed to delete batch");
            }
        })
        
    }

    cancel(): void {
        this.message.info('Action cancelled');
    }

}