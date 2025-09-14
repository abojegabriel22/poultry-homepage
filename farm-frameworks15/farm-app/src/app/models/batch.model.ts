
export class BatchModel {
    constructor(
        public name: string,
        public description: string,
        public userId: string
    ){}
}

export class BatchData {
    constructor(
        public userId: string,
        public name: string,
        public description: string,
        public status: string,
        public _id: string,
        public startDate: string,
        public createAt: string
    ){}
}

export class BatchResponse {
    constructor(
        public message: string,
        public data: BatchResponse
    ){}
}
