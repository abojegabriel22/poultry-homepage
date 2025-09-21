import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BatchService } from '../services/batch.service';
import { BatchData } from '../models/batch.model';
import { PurchaseService } from '../services/purchase.service';
import { purchaseArray } from '../models/purchase.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css']
})
export class BatchesComponent implements OnInit{

  batches: BatchData[] = []
  purchases: purchaseArray[] = []
  selectedBatchId: string | null = null
  loading: boolean = false
  // loadPurchase: boolean = false
  batchLoading: { [id: string]: boolean } = {};
  errorMessage: string = ""
  constructor(
    private batchService: BatchService,
    private purchaseService: PurchaseService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getAllBatches()
  }

  // fetch all batches
  getAllBatches():void{
    this.loading = true
    this.batchService.getAllBatchArray().subscribe({
      next: (res) => {
        this.batches = res.data
        this.loading = false
      }, error: (err) => {
        this.errorMessage = err.error?.message || "Unable to fetch Batch records"
        this.loading = false
      }
    })
  }

  selectedBatch(batchId: string): void {
    console.log("Selected Batch Id: ", batchId)
    this.selectedBatchId = batchId
    this.batchLoading[batchId] = true;
    this.purchaseService.getPurchasesByBatchId(batchId).subscribe({
      next: (res) => {
        this.purchases = res.data
        console.log("Purchases: ", this.purchases)
        this.batchLoading[batchId] = false;
        // navigate only when purchase is available
        if(this.purchases && this.purchases.length > 0){
          this.router.navigate(["/purchase", batchId])
        }else{
          alert(this.errorMessage)
        }
      }, error: (err) => {
        this.errorMessage = err.error?.message || "Unable to fetch purchases for this batch";
        this.batchLoading[batchId] = false;
        alert(this.errorMessage)
      }
    })
  }
}
