
import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { from, Observable } from "rxjs"
import { PurchaseInputs, PurchaseResponse } from "../models/purchase.model"
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

    registerFeed(feedRecord: feedsInput):Observable<feedsResponse>{
        return this.http.post<feedsResponse>(`${environment.poultryApiUrl}/feeds`, feedRecord)
    }
}