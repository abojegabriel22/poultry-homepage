
export class MortalityInput{
    constructor(
        public mortalityRate: number,
        public batchId: string,
        public purchaseId: string
    ){}
}

export class MortalityResponse{
    constructor(
        public message: string,
        public data: MortalityData
    ){}
}
export class MortalityResponses{
    constructor(
        public message: string,
        public data: MortalityDatas
    ){}
}

export class MortalityData{
    constructor(
        public batchId: string,
        public purchaseId: string,
        public mortalityRate: number,
        public mortalityAge: number,
        public _id: string,
        public date: string
    ){}
}
export class MortalityDatas{
    constructor(
        public batchId: batchId,
        public purchaseId: purchaseId,
        public mortalityRate: number,
        public mortalityAge: number,
        public _id: string,
        public date: string
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

