import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { feedsDatas, feedsResponses } from "src/app/models/feeds.model";
import { MortalityDatas, MortalityResponses } from "src/app/models/mortality.model";
import { SalesDatas, SalesResponses, saleSum, saleSummary } from "src/app/models/sales.model";
import { VaccineDatas, VaccineResponses } from "src/app/models/vaccine.model";
import { PurchaseService } from "src/app/services/purchase.service";

declare var bootstrap: any;

@Component({
  selector: "app-view-vaccine",
  templateUrl: "./view-vaccineData.component.html",
  styleUrls: [
    "./view-vaccine.component.css",
    "../../../side-panel-lg/side-panel.component.css",
    "../../../home/home.component.css",
    "../view-batchdata/view-batchdata.component.css"
  ]
})
export class ViewVaccineComponent implements OnInit {
  vaccines: VaccineDatas[] = [];
  feeds: feedsDatas[] = [];
  sales: SalesDatas[] = [];
  saleSumData: saleSum | null = null
  mortalities: MortalityDatas[] = [];
  batchId: string = "";
  loading: boolean = false;
  errorMessage: string = "";
  selectedSection: string = "vaccines"; // default

  constructor(
    private purchaseService: PurchaseService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.batchId = this.route.snapshot.paramMap.get("batchId") || "";

    if (this.batchId) {
      this.loadSectionData(this.selectedSection);
    }
  }

  // ✅ Centralized loader for each section
  private loadSectionData(section: string): void {
    switch (section) {
      case "vaccines":
        this.getVaccineData(this.batchId);
        break;
      case "feeds":
        this.getFeedsData(this.batchId);
        break;
      case "sales":
        this.getSalesData(this.batchId);
        break;
      case "mortalities":
        this.getMortalityData(this.batchId);
        break;
      case "summary":
        this.getSaleSummary(this.batchId);
        break;
      // case "purchases":
      //   this.getPurchaseData(this.batchId);
      //   break;
    }
  }

  // ✅ Vaccine API
  getVaccineData(batchId: string): void {
    this.loading = true;
    this.purchaseService.getVaccineByBatchId(batchId).subscribe({
      next: (res: VaccineResponses) => {
        let vaccines = Array.isArray(res.data) ? res.data : [res.data];

        // normalize batchId
        this.vaccines = vaccines.map(v => ({
          ...v,
          batchId:
            typeof v.batchId === "string"
              ? { _id: v.batchId, name: "N/A", startDate: "" }
              : v.batchId
        }));

        this.loading = false;
        console.log("Normalized vaccine data: ", this.vaccines);
      },
      error: err => {
        this.errorMessage =
          err.error?.message || "Unable to fetch vaccine records";
        this.loading = false;
      }
    });
  }

  // ✅ Feeds API
  getFeedsData(batchId: string): void {
    this.loading = true;
    this.purchaseService.getFeedsByBatchId(batchId).subscribe({
      next: (res: feedsResponses) => {
        this.feeds = Array.isArray(res.data) ? res.data : [res.data];

        // normalize batchId & purchaseId
        this.feeds = this.feeds.map(v => ({
          ...v,
          batchId:
            typeof v.batchId === "string"
              ? { _id: v.batchId, name: "N/A", startDate: "" }
              : v.batchId,
          purchaseId:
            typeof v.purchaseId === "string"
              ? { _id: v.purchaseId, name: "N/A", daysSincePurchase: 0 }
              : v.purchaseId
        }));

        this.loading = false;
        console.log("Normalized feeds data: ", this.feeds);
      },
      error: err => {
        this.errorMessage = err.error?.message || "Unable to fetch feeds!";
        this.loading = false;
      }
    });
  }

  getSalesData(batchId: string): void {
    this.loading = true
    this.purchaseService.getSalesByBatchId(batchId).subscribe({
      next: (res: SalesResponses) => {
        this.sales = Array.isArray(res.data) ? res.data : [res.data]
        // normalize batchId and purchaseId
        this.sales = this.sales.map(v => ({
          ...v,
          batchId: typeof v.batchId === "string" ? { _id: v.batchId, name: "N/A", startDate: "" } : v.batchId,
          purchaseId: typeof v.purchaseId === "string" ? { _id: v.purchaseId, name: "N/A", daysSincePurchase: 0, dateOfPurchase: "N/A", dateOfPurchaseFormatted: "N/A" } : v.purchaseId
          
        }))
        this.loading = false
        console.log("Normalized sales data: ", this.sales)
    }, error: (err) => {
      this.errorMessage = err.error?.message || "Unable to fetch sales!"
      this.loading = false;
    }
    })
  }
  getSaleSummary(batchId: string): void {
    this.loading = true
    this.purchaseService.getSaleSummary(batchId).subscribe({
      next: (res: saleSummary) => {
        this.saleSumData = res.data
        this.loading = false
        console.log("sale summary: ", this.saleSumData)
      }, error:(err) => {
        this.errorMessage = err.error?.message || "Unable to fetch sale summary data!"
        this.loading = false
      }
    })
  }

  getMortalityData(batchId: string): void {
    this.loading = true
    this.purchaseService.getMortalityByBatchId(batchId).subscribe({
      next: (res: MortalityResponses) => {
        this.mortalities = Array.isArray(res.data) ? res.data : [res.data]
        // normalize batchId and purchaseId
        this.mortalities = this.mortalities.map(v => ({
          ...v,
          batchId: typeof v.batchId === "string" ? { _id: v.batchId, name: "N/A", startDate: "" } : v.batchId,
          purchaseId: typeof v.purchaseId === "string" ? { _id: v.purchaseId, name: "N/A", dateOfPurchase: "N/A", daysSincePurchase: 0, dateOfPurchaseFormatted: "N/A" } : v.purchaseId
        }))
        this.loading = false
        console.log("Normalize mortality data: ", this.mortalities)
      }, error: (err) => {
        this.errorMessage = err.error?.message || "Unable to fetch mortalities"
        this.loading = false
      }
    })
  }

  // ✅ Tab switch handler
  setSelectedSection(section: string): void {
    this.selectedSection = section;

    if (this.batchId) {
      this.loadSectionData(section);
    }

    // close offcanvas after selecting
    const close1 = document.getElementById("offcanvasWithBothOptions");
    if (close1) {
      const bsCanvas = bootstrap.Offcanvas.getInstance(close1);
      bsCanvas?.hide();
    }
  }

  goback():void{
    this.location.back()
  }
}
