
export class SalesInput{
    constructor(
        public numberSold: number,
        public totalPrice: number,
        public batchId: string,
        public purchaseId: string
    ){}
}

export class SalesResponse{
    constructor(
        public message: string,
        public data: SalesData
    ){}
}
export class SalesResponses{
    constructor(
        public message: string,
        public data: SalesDatas
    ){}
}

export class SalesData{
    constructor(
        public batchId: string,
        public purchaseId: string,
        public numberSold: number,
        public totalPrice: number,
        public pricePerSale: number,
        public date: string,
        public age: number,
        public _id: string
    ){}
}
export class SalesDatas{
    constructor(
        public batchId: batchId,
        public purchaseId: purchaseId,
        public numberSold: number,
        public totalPrice: number,
        public pricePerSale: number,
        public date: string,
        public age: number,
        public _id: string
    ){}
}

export class batchId{
    constructor(
        public _id: string,
        public name: string,
        public startDate: string
    ){}
}

export class purchaseId{
    constructor(
        public name: string,
        public _id: string,
        public dateOfPurchase: string,
        public daysSincePurchase: number,
        public dateOfPurchaseFormatted: string
    ){}
}

export class saleSummary{
    constructor(
        public message: string,
        public data: saleSum
    ){}
}

export class saleSum{
    constructor(
        public _id: string,
        public batchId: string,
        public __v: number,
        public lastUpdated: string,
        public totalNumSold: number,
        public totalSaleAmount: number
    ){}
}
