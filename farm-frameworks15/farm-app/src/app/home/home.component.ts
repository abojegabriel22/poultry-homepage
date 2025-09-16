
import { Component, OnInit } from "@angular/core";
import { FormSelectionService } from "../services/form-selection.service";
import { NgForm } from "@angular/forms";
import { getAllPurchaseData, purchaseArray, purchaseArrays, PurchaseInputs, PurchaseResponse } from "../models/purchase.model";
import { PurchaseService } from "../services/purchase.service";
import { feedsData, feedsInput, feedsResponse } from "../models/feeds.model";
@Component({
    selector: 'app-admin-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    title = 'Admin & User database'
    subtitle = 'view your poultry farm records only.'
    formTitle = "Add purchase"

    constructor(
        private formSelectionService: FormSelectionService,
        private purchaseService: PurchaseService
    ){}

    purchaseUser: PurchaseInputs = new PurchaseInputs(0,0,"")
    feedsUser: feedsInput = new feedsInput(0,0,'','')
    isLoading: boolean = false
    successMessage: string = ''
    errorMessage: string = ''
    currentPurchase: any = null


    ngOnInit(): void {
        this.formSelectionService.selectedForm$.subscribe(name => {
            this.formTitle = name
        })
        // get batchId directly from local storage
        const setSelectedBatch = localStorage.getItem("selectedBatch")
        if(setSelectedBatch){
            try{
                const parsedBatch = JSON.parse(setSelectedBatch)
                this.purchaseUser.batchId = parsedBatch._id
                this.feedsUser.batchId = parsedBatch._id

                // check if purchase is available for this batch
                this.purchaseService.getPurchasesByBatchId(parsedBatch._id).subscribe({
                    next: (res: purchaseArrays) => {
                        if(res && res.data.length > 0){
                            this.currentPurchase = res.data // store the purchase records
                            this.feedsUser.purchaseId = this.currentPurchase[this.currentPurchase.length -1]._id // auto link feeds
                            localStorage.setItem("purchaseId", this.feedsUser.purchaseId)
                        }
                    }, error: (err) => {
                        console.error("Error fetching purchase by batchId", err.message)
                    }
                })
            } catch(err){
                console.error("Error passing selectedBatch id from localstorage: ", err)
            }
        }

        // get saved purchaseId
        const savedPurchaseId = localStorage.getItem("purchasId")
        if(savedPurchaseId){
            this.feedsUser.purchaseId = savedPurchaseId
        }
    }

    submitForm(form: NgForm){
        this.isLoading = true
        this.successMessage = ''
        this.errorMessage = ''
        if(form.invalid){
            this.isLoading = false
            this.errorMessage = "Invalid form"
            console.log("form is invalid: ", this.purchaseUser || this.feedsUser)
            return
        }
        console.log("form is valid: ", this.purchaseUser || this.feedsUser)
        // if in purchase form 
        if(this.formTitle === "Add purchase"){
            this.purchaseService.registerPurchase(this.purchaseUser).subscribe({
                next: (res: PurchaseResponse) => {
                    this.isLoading = false
                    this.showAlert(res.message || "Purchase saved successfully ✅", "success");
                    this.errorMessage = ''
                    console.log("Purchase record taken: ", res)
                    // save purchaseId globally for other forms to use
                    const purchaseId = res.data?._id
                    this.feedsUser.purchaseId = purchaseId
                    localStorage.setItem("purchaseId", purchaseId)

                    form.resetForm({
                        batchId: this.purchaseUser.batchId
                    })

                }, error: (err) => {
                    this.showAlert(err.error?.message || "Unable to save purchase record ❌", "error");
                    this.successMessage = ''
                    this.isLoading = false
                    console.log("Unable to save purchase record: ", err.error?.message)
                }
            })
        }
        
        // if in feeds form
        if(this.formTitle === "Add feeds"){
            // feeds record
            // load purchaseId from memory or localStorage if available 
            this.feedsUser.purchaseId = this.feedsUser.purchaseId || localStorage.getItem("purchaseId") || ""

            this.purchaseService.registerFeed(this.feedsUser).subscribe({
                next: (res: feedsResponse) => {
                    this.isLoading = false
                    this.showAlert(res.message || "Feeds data saved successfully ✅", "success")
                    this.errorMessage = ''
                    console.info("Feeds record taken: ", res)
                }, error: (err) => {
                    this.isLoading = false
                    this.showAlert(err.error?.message || "Unable to save feeds record ❌", "error")
                    console.error("Unable to save feeds record: ", err.error?.message)
                }
            })
            form.resetForm({
                batchId: this.purchaseUser.batchId,
                purchaseId: this.feedsUser.purchaseId
            })
        }
    }
    showAlert(message: string, type: "success" | "error") {
        if (type === "success") {
            this.successMessage = message;
            this.errorMessage = "";
        } else {
            this.errorMessage = message;
            this.successMessage = "";
        }

        // Auto clear after 3 seconds
        setTimeout(() => {
            this.successMessage = "";
            this.errorMessage = "";
        }, 3000);
    }

    selectedForm(name: string){
        this.formSelectionService.setSelectedForm(name)
    }

}