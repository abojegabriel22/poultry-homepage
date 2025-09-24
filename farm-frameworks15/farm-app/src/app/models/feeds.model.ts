
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
export class feedsResponses{
    constructor(
        public message: string,
        public data: feedsDatas
    ){}
}

export class feedsDatas{
    constructor(
        public name: string,
        public quantity: number,
        public totalPrice: number,
        public pricePerFeed: number,
        public batchId: batchIdInfo,
        public purchaseId: purchaseInfo,
        public _id: string,
        public date: string
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

export class batchIdInfo{
    constructor(
        public _id: string,
        public name: string,
        public startDate: string
    ){}
}

export class purchaseInfo{
    constructor(
        public _id: string,
        public daysSincePurchase: number,
        public name: string
    ){}
}