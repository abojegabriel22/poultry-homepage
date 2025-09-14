
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
        public dateOfPurchaseFormatted: number
    ){}
}