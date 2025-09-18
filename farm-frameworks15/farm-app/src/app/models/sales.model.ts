
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
