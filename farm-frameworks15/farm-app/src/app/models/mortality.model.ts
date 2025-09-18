
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
