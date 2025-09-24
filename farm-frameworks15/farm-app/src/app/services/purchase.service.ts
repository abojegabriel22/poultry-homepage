
import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { from, Observable } from "rxjs"
import { getAllPurchaseData, purchaseArray, purchaseArrays, PurchaseInputs, PurchaseResponse } from "../models/purchase.model"
import { environment } from "src/environments/environment"
import { feedsInput, feedsResponse, feedsResponses } from "../models/feeds.model"
import { MortalityInput, MortalityResponse, MortalityResponses } from "../models/mortality.model"
import { VaccineData, VaccineInput, VaccineResponse, VaccineResponses } from "../models/vaccine.model"
import { SalesInput, SalesResponse, SalesResponses, saleSummary } from "../models/sales.model"

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

    // feeds registry 
    getFeedsByBatchId(batchId: string):Observable<feedsResponses>{
        return this.http.get<feedsResponses>(`${environment.poultryApiUrl}/feeds/${batchId}`)
    }

    //  mortality registry 
    registerMortality(mortalityRecord: MortalityInput):Observable<MortalityResponse>{
        return this.http.post<MortalityResponse>(`${environment.poultryApiUrl}/mortality`, mortalityRecord)
    }

    getMortalityByBatchId(batchId: string): Observable<MortalityResponses>{
        return this.http.get<MortalityResponses>(`${environment.poultryApiUrl}/mortality/${batchId}`)
    }

    // vaccine registry 
    registerVaccine(vaccineRecord: VaccineInput):Observable<VaccineResponse>{
        return this.http.post<VaccineResponse>(`${environment.poultryApiUrl}/vaccine`, vaccineRecord)
    }

    getVaccineByBatchId(batchId: string):Observable<VaccineResponses>{
        return this.http.get<VaccineResponses>(`${environment.poultryApiUrl}/vaccine/${batchId}`)
    }

    // sales registry 
    registerSales(saleRecord: SalesInput):Observable<SalesResponse>{
        return this.http.post<SalesResponse>(`${environment.poultryApiUrl}/sales`, saleRecord)
    }
    getSalesByBatchId(batchId: string):Observable<SalesResponses>{
        return this.http.get<SalesResponses>(`${environment.poultryApiUrl}/sales/${batchId}`)
    }
    getSaleSummary(batchId: string):Observable<saleSummary>{
        return this.http.get<saleSummary>(`${environment.poultryApiUrl}/sale-summary/${batchId}`)
    }
}