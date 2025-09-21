
export class PurchaseInputs{
    constructor(
        public quantity: number,
        public price: number,
        public batchId: string
    ){}
}

export class PurchaseResponse{
    constructor(
        public message: string,
        public data: PurchaseData
    ){}
}

export class PurchaseData{
    constructor(
        public quantity: number,
        public price: number,
        public batchId: string,
        public pricePerChick: number,
        public _id: string,
        public dateOfPurchase: string,
        public daysSincePurchase: number,
        public dateOfPurchaseFormatted: string
    ){}
}

export class getAllPurchaseData{
    constructor(
        public message: string,
        public data: PurchaseData[]
    ){}
}

export class purchaseArrays{
    constructor(
        public message: string,
        public data: purchaseArray[]
    ){}
}

export class purchaseArray{
    constructor(
        public quantity: number,
        public price: number,
        public batchId: batchIdInfo,
        public pricePerChick: number,
        public _id: string,
        public dateOfPurchase: string,
        public daysSincePurchase: number,
        public dateOfPurchaseFormatted: string

    ){}
}

export class batchIdInfo{
    constructor(
        public _id: string,
        public name: string,
        public startDate: string
    ){}
}
