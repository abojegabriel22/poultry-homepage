import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { VaccineData, VaccineDatas, VaccineResponse, VaccineResponses } from "src/app/models/vaccine.model";
import { PurchaseService } from "src/app/services/purchase.service";

@Component({
  selector: "app-view-vaccine",
  templateUrl: "./view-vaccineData.component.html",
  styleUrls: [
    "./view-vaccine.component.css",
    "../../../side-panel-lg/side-panel.component.css",
    "../../../home/home.component.css"
  ]
})
export class ViewVaccineComponent implements OnInit {
  vaccines: VaccineDatas[] = [];
  batchId: string = "";
  loading: boolean = false;
  errorMessage: string = "";

  constructor(
    private purchaseService: PurchaseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.batchId = this.route.snapshot.paramMap.get("batchId") || "";

    if (this.batchId) {
      this.getVaccineData(this.batchId);
    }
  }

  // call vaccine route
  getVaccineData(batchId: string): void {
    this.loading = true;
    this.purchaseService.getVaccineByBatchId(batchId).subscribe({
      next: (res: VaccineResponses) => {
        let vaccines = Array.isArray(res.data) ? res.data : [res.data];

        // ✅ Normalize batchId so it's always an object
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
}
