
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { BatchData } from "../models/batch.model";

@Injectable()

export class BatchSelectionService{
    private selectedBatchSource = new BehaviorSubject<BatchData | null>(null)
    selectedBatch$ = this.selectedBatchSource.asObservable()

    setSelectedBatch(batch: BatchData){
        this.selectedBatchSource.next(batch)
    }
}