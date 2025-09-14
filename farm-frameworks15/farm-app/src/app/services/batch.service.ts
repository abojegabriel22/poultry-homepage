
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable } from "rxjs";
import { BatchData, BatchModel, BatchResponse } from "../models/batch.model";
import { environment } from "src/environments/environment";

@Injectable()

export class BatchService {
    constructor(
        private http: HttpClient
    ){}

    // create a batch record
    createBatch(batch: BatchModel):Observable<BatchResponse>{
        return this.http.post<BatchResponse>(`${environment.poultryApiUrl}/batch`, batch)
    }

    getallbatchbyuser(userId: string):Observable<BatchData[]>{
        return this.http.get<BatchData[]>(`${environment.poultryApiUrl}/batch/admin/${userId}`)
    }

}