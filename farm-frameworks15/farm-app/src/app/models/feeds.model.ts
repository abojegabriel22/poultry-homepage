
export class feedsInput{
    constructor(
        public quantity: number,
        public totalPrice: number,
        public batchId: string,
        public purchaseId: string
    ){}
}

export class feedsResponse{
    constructor(
        public message: string,
        public data: feedsData
    ){}
}

export class feedsData{
    constructor(
        public quantity: number,
        public totalPrice: number,
        public pricePerFeed: number,
        public batchId: string,
        public purchaseId: string,
        public _id: string,
        public date: string
    ){}
}