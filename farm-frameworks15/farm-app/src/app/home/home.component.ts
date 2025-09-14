
import { Component, OnInit } from "@angular/core";
import { FormSelectionService } from "../services/form-selection.service";
import { NgForm } from "@angular/forms";
import { PurchaseInputs } from "../models/purchase.model";
import { PurchaseService } from "../services/purchase.service";
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
    isLoading: boolean = false
    successMessage: string = ''
    errorMessage: string = ''

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
            } catch(err){
                console.error("Error passing selectedBatch id from localstorage: ", err)
            }
        }
    }

    submitForm(form: NgForm){
        this.isLoading = true
        this.successMessage = ''
        this.errorMessage = ''
        if(form.invalid){
            this.isLoading = false
            this.errorMessage = "Invalid form"
            console.log("form is invalid: ", this.purchaseUser)
            return
        }
        console.log("form is valid: ", this.purchaseUser)
        this.purchaseService.registerPurchase(this.purchaseUser).subscribe({
            next: (res) => {
                this.isLoading = false
                this.showAlert(res.message || "Purchase saved successfully ✅", "success");
                this.errorMessage = ''
                console.log("Purchase record taken: ", res)

            }, error: (err) => {
                this.showAlert(err.error?.message || "Unable to save purchase record ❌", "error");
                this.successMessage = ''
                this.isLoading = false
                console.log("Unable to save purchase record: ", err.error?.message)
            }
        })
        form.resetForm({
            batchId: this.purchaseUser.batchId
        })
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

}