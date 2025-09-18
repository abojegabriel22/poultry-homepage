import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormSelectionService } from "../services/form-selection.service";
import { NgForm } from "@angular/forms";
import { purchaseArrays, PurchaseInputs, PurchaseResponse } from "../models/purchase.model";
import { PurchaseService } from "../services/purchase.service";
import { feedsInput, feedsResponse } from "../models/feeds.model";
import { MortalityInput, MortalityResponse } from "../models/mortality.model";
import { VaccineInput, VaccineResponse } from "../models/vaccine.model";
import { SalesInput, SalesResponse } from "../models/sales.model";
import { BatchSelectionService } from "../services/batch-selection.service";

@Component({
  selector: 'app-admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Admin & User database';
  subtitle = 'view your poultry farm records only.';
  formTitle = "Add purchase";
  side_panel_batch = "Name"

  constructor(
    private formSelectionService: FormSelectionService,
    private purchaseService: PurchaseService,
    private cdr: ChangeDetectorRef,
    private batchSelectionService: BatchSelectionService
  ) {}

  purchaseUser: PurchaseInputs = new PurchaseInputs(0, 0, "");
  feedsUser: feedsInput = new feedsInput(0, 0, '', '');
  mortalityUser: MortalityInput = new MortalityInput(0, '', '');
  vaccineUser: VaccineInput = new VaccineInput('',0,0,'','')
  salesUser: SalesInput = new SalesInput(0,0,'','')
  isLoading: boolean = false;

  // Purchase messages
  successMessage: string = '';
  errorMessage: string = '';

  // Feeds messages
  successFeedsMessage = '';
  errorFeedsMessage = '';

  // Mortality messages
  successMortalityMessage = '';
  errorMortalityMessage = '';

  //   Vaccine messages 
  successVaccineMessage = ''
  errorVaccineMessage = ''

  successSalesMessage = ''
  errorSalesMessage = ''

  currentPurchase: any = null;

  ngOnInit(): void {
    this.formSelectionService.selectedForm$.subscribe(name => {
      this.formTitle = name;
      this.batchSelectionService.selectedBatch$.subscribe(batch => {
        if(batch){
          this.side_panel_batch = batch.name
        }
      })
    });

    // get batchId directly from local storage
    const setSelectedBatch = localStorage.getItem("selectedBatch");
    if (setSelectedBatch) {
      try {
        const parsedBatch = JSON.parse(setSelectedBatch);
        this.purchaseUser.batchId = parsedBatch._id;
        this.feedsUser.batchId = parsedBatch._id;
        this.mortalityUser.batchId = parsedBatch._id;
        this.vaccineUser.batchId = parsedBatch._id
        this.salesUser.batchId = parsedBatch._id

        // check if purchase is available for this batch
        this.purchaseService.getPurchasesByBatchId(parsedBatch._id).subscribe({
          next: (res: purchaseArrays) => {
            if (res && res.data.length > 0) {
              this.currentPurchase = res.data; // store the purchase records
              this.feedsUser.purchaseId = this.currentPurchase[this.currentPurchase.length - 1]._id;
              this.mortalityUser.purchaseId = this.currentPurchase[this.currentPurchase.length - 1]._id;
              this.vaccineUser.purchaseId = this.currentPurchase[this.currentPurchase.length - 1]._id
              localStorage.setItem("purchaseId", this.feedsUser.purchaseId);
              localStorage.setItem("purchaseId", this.mortalityUser.purchaseId);
              localStorage.setItem("purchaseId", this.vaccineUser.purchaseId)
              localStorage.setItem("purchaseId", this.salesUser.purchaseId)
            }
          },
          error: (err) => {
            console.error("Error fetching purchase by batchId", err.message);
          }
        });
      } catch (err) {
        console.error("Error parsing selectedBatch id from localstorage: ", err);
      }
    }

    // get saved purchaseId
    const savedPurchaseId = localStorage.getItem("purchaseId");
    if (savedPurchaseId) {
      this.feedsUser.purchaseId = savedPurchaseId;
      this.mortalityUser.purchaseId = savedPurchaseId;
      this.vaccineUser.purchaseId = savedPurchaseId
      this.salesUser.purchaseId = savedPurchaseId
    }
  }

  // 🔧 Utility to auto-clear messages
  clearMessageAfterDelay(ref: 'error' | 'success' | 'feedsError' | 'feedsSuccess' | 'mortalityError' | 'mortalitySuccess' | 'vaccineError' | 'vaccineSuccess' | 'saleError' | 'saleSuccess', delay = 3000) {
    setTimeout(() => {
      switch (ref) {
        case 'error': this.errorMessage = ''; break;
        case 'success': this.successMessage = ''; break;
        case 'feedsError': this.errorFeedsMessage = ''; break;
        case 'feedsSuccess': this.successFeedsMessage = ''; break;
        case 'mortalityError': this.errorMortalityMessage = ''; break;
        case 'mortalitySuccess': this.successMortalityMessage = ''; break;
        case 'vaccineError': this.errorVaccineMessage = ''; break;
        case 'vaccineSuccess': this.successVaccineMessage = ''; break;
        case 'saleSuccess': this.successSalesMessage = ''; break;
        case 'saleError': this.errorSalesMessage = ''; break;
      }
      this.cdr.detectChanges(); // 👈 force refresh
    }, delay);
  }

  submitForm(form: NgForm) {
    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.successFeedsMessage = '';
    this.errorFeedsMessage = '';
    this.successMortalityMessage = '';
    this.errorMortalityMessage = '';
    this.successVaccineMessage = ''
    this.errorVaccineMessage = ''
    this.successSalesMessage = ''
    this.errorSalesMessage = ''

    // purchase
    if (this.formTitle === "Add purchase") {
      if (form.invalid) {
        this.isLoading = false;
        this.errorMessage = "Invalid form";
        console.log("form is invalid (purchase): ", this.purchaseUser);
        this.clearMessageAfterDelay('error'); 
        return;
      }
      console.log("form is valid (purchase): ", this.purchaseUser);

      this.purchaseService.registerPurchase(this.purchaseUser).subscribe({
        next: (res: PurchaseResponse) => {
          this.isLoading = false;
          this.successMessage = res.message || "Purchase saved successfully ✅";
          this.errorMessage = '';
          console.log("Purchase record taken: ", res);
          const purchaseId = res.data?._id;
          this.feedsUser.purchaseId = purchaseId;
          localStorage.setItem("purchaseId", purchaseId);

          form.resetForm({
            batchId: this.purchaseUser.batchId
          });

          this.clearMessageAfterDelay('success');
        },
        error: (err) => {
          this.errorMessage = err.error?.message || "Unable to save purchase record ❌";
          this.successMessage = '';
          this.isLoading = false;
          console.log("Unable to save purchase record: ", err.error?.message);
          this.clearMessageAfterDelay('error');
        }
      });
    }

    // feeds
    if (this.formTitle === "Add feeds") {
      if (form.invalid) {
        this.isLoading = false;
        this.errorFeedsMessage = "Invalid feeds form";
        console.log("form is invalid (feeds): ", this.feedsUser);
        this.clearMessageAfterDelay('feedsError');
        return;
      }
      console.log("form is valid (feeds): ", this.feedsUser);

      this.feedsUser.purchaseId = this.feedsUser.purchaseId || localStorage.getItem("purchaseId") || "";

      this.purchaseService.registerFeed(this.feedsUser).subscribe({
        next: (res: feedsResponse) => {
          this.isLoading = false;
          this.successFeedsMessage = res.message || "Feeds data saved successfully ✅";
          this.errorFeedsMessage = '';
          console.info("Feeds record taken: ", res);
          form.resetForm({
            batchId: this.salesUser.batchId,
            purchaseId: this.salesUser.purchaseId
          });
          this.clearMessageAfterDelay('feedsSuccess');
        },
        error: (err) => {
          this.isLoading = false;
          this.errorFeedsMessage = err.error?.message || "Unable to save feeds record ❌";
          this.successFeedsMessage = '';
          console.error("Unable to save feeds record: ", err.error?.message);
          this.clearMessageAfterDelay('feedsError');
        }
      });

      form.resetForm({
        batchId: this.purchaseUser.batchId,
        purchaseId: this.feedsUser.purchaseId
      });
    }

    // mortality
    if (this.formTitle === "Add mortality") {
      if (form.invalid) {
        this.isLoading = false;
        this.errorMortalityMessage = "Invalid mortality form";
        console.log("form is invalid (mortality): ", this.mortalityUser);
        this.clearMessageAfterDelay('mortalityError');   
        return;
      }
      console.log("form is valid (mortality): ", this.mortalityUser);

      this.mortalityUser.purchaseId =
        this.mortalityUser.purchaseId || localStorage.getItem("purchaseId") || "";

      this.purchaseService.registerMortality(this.mortalityUser).subscribe({
        next: (res: MortalityResponse) => {
          this.isLoading = false;
          this.successMortalityMessage = res.message || "Mortality record saved successfully ✅";
          this.errorMortalityMessage = '';
          form.resetForm({
            batchId: this.salesUser.batchId,
            purchaseId: this.salesUser.purchaseId
          });
          this.clearMessageAfterDelay('mortalitySuccess');
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMortalityMessage = err.error?.message || "Unable to save mortality record ❌";
          this.successMortalityMessage = '';
          this.clearMessageAfterDelay('mortalityError');
        }
      });
    }

    // vaccine
    if(this.formTitle === "Add vaccines"){
      if(form.invalid){
        this.isLoading = false
        this.errorVaccineMessage = "Invalid Vaccine form"
        console.log("form is invalid (vaccine): ", this.vaccineUser)
        this.clearMessageAfterDelay("vaccineError")
        return
      }
      console.log("Form is valid (Vaccine): ", this.vaccineUser)
      this.purchaseService.registerVaccine(this.vaccineUser).subscribe({
        next: (res: VaccineResponse) => {
          this.isLoading = false
          this.successVaccineMessage = res.message || "Vacine record saved successfully ✅"
          this.errorVaccineMessage = ""
          form.resetForm({
            batchId: this.salesUser.batchId,
            purchaseId: this.salesUser.purchaseId
          });
          this.clearMessageAfterDelay("vaccineSuccess")
        }, error: (err) => {
          this.isLoading = false
          this.errorVaccineMessage = err.error?.message || "Unable to save vaccine record ❌"
          this.successVaccineMessage = ""
          this.clearMessageAfterDelay("vaccineError")
        }
      })
    }

    if(this.formTitle === "Record sales"){
      if(form.invalid){
        this.isLoading = false
        this.errorSalesMessage = "Invalid sale form"
        console.log("form is invalid (sale): ", this.salesUser)
        this.clearMessageAfterDelay("saleError")
        return
      }
      console.log("sales is valid")
      this.purchaseService.registerSales(this.salesUser).subscribe({
        next: (res: SalesResponse) => {
          this.isLoading = false
          this.successSalesMessage = res.message || "sales record saved successfully ✅"
          this.errorSalesMessage = ""
          form.resetForm({
            batchId: this.salesUser.batchId,
            purchaseId: this.salesUser.purchaseId
          });
          this.clearMessageAfterDelay("saleSuccess")
        }, error:(err)=>{
          this.isLoading = false
          this.errorSalesMessage = err.error?.message || "Unable to save sales record ❌"
          this.successVaccineMessage = ""
          this.clearMessageAfterDelay("saleError")
        }
      })
    }
  }

  selectedForm(name: string) {
    this.formSelectionService.setSelectedForm(name);
  }
}
