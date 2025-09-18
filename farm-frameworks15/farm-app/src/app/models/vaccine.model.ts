
export class VaccineInput{
    constructor(
        public vaccineName: string,
        public vaccinePrice: number,
        public quantity: number,
        public batchId: string,
        public purchaseId: string
    ){}
}

export class VaccineResponse{
    constructor(
        public message: string,
        public data: VaccineData
    ){}
}

export class VaccineData{
    constructor(
        public batchId: string,
        public purchaseId: string,
        public vaccineName: string,
        public vaccinePrice: number,
        public quantity: number,
        public totalAmount: number,
        public _id: string,
        public date: string
    ){}
}
