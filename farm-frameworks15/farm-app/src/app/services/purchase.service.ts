
import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { from, Observable } from "rxjs"
import { getAllPurchaseData, purchaseArray, purchaseArrays, PurchaseInputs, PurchaseResponse } from "../models/purchase.model"
import { environment } from "src/environments/environment"
import { feedsInput, feedsResponse } from "../models/feeds.model"

@Injectable()

export class PurchaseService{
    constructor(
        private http: HttpClient
    ){}

    // register a new purchase
    registerPurchase(takeRecord: PurchaseInputs):Observable<PurchaseResponse>{
        return this.http.post<PurchaseResponse>(`${environment.poultryApiUrl}/purchase`, takeRecord)
    }

    // get purchase by batch id
    getPurchasesByBatchId(batchId: string):Observable<purchaseArrays>{
        return this.http.get<purchaseArrays>(`${environment.poultryApiUrl}/purchase/${batchId}`)
    }

    registerFeed(feedRecord: feedsInput):Observable<feedsResponse>{
        return this.http.post<feedsResponse>(`${environment.poultryApiUrl}/feeds`, feedRecord)
    }
}