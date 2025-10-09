import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BatchService } from '../services/batch.service';
import { BatchData } from '../models/batch.model';
import { PurchaseService } from '../services/purchase.service';
import { purchaseArray } from '../models/purchase.model';
import { Router } from '@angular/router';
import * as AOS from 'aos';
// import 'aos/dist/aos.css';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css'],
  // animations: [
  //   trigger('fadeSlideUp', [
  //     transition(':enter', [
  //       query('.card', [
  //         style({ opacity: 0, transform: 'translateY(20px)' }),
  //         stagger(150, [
  //           animate(
  //             '700ms ease-out',
  //             style({ opacity: 1, transform: 'translateY(0)' })
  //           )
  //         ])
  //       ])
  //     ])
  //   ])
  // ]
})
export class BatchesComponent implements OnInit, AfterViewInit{

  batches: BatchData[] = []
  purchases: purchaseArray[] = []
  selectedBatchId: string | null = null
  loading: boolean = false
  searchTerm: string = '';
  filteredBatches: any[] = [];
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

  ngAfterViewInit(): void {
    AOS.init({
      duration: 800, // animation duration (ms)
      easing: 'ease-in-out-quart', // natural easing
      once: false, // animate again when scrolling up
      mirror: true // re-trigger when scrolling back up
    });
  }

  // fetch all batches
  getAllBatches():void{
    this.loading = true
    this.batchService.getAllBatchArray().subscribe({
      next: (res) => {
        this.batches = res.data
        this.filteredBatches = [...this.batches] // ✅ initialize with all batches
        this.loading = false
        setTimeout(() => AOS.refresh()); // refresh after data loads
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

  // 🔹 Helper for staggered effects
  getAosDelay(index: number): number {
    return (index % 4) * 150; // delays 0, 150, 300, 450ms
  }

  getAosEffect(index: number): string {
    const effects = ['fade-up', 'zoom-in', 'flip-left', 'fade-right', 'fade-down', 'zoom-out', 'flip-up'];
    return effects[index % effects.length];
  }

  // ✅ Search filter (fixed)
  filterBatches(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredBatches = [...this.batches]; // show all if empty
    } else {
      this.filteredBatches = this.batches.filter(b =>
        b.name.toLowerCase().includes(term)
      );
    }
  }

}
