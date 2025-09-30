
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
        public data: VaccineData | VaccineData[]
    ){}
}
export class VaccineResponses{
    constructor(
        public message: string,
        public data: VaccineDatas | VaccineData[]
    ){}
}

export class VaccineData{
    constructor(
        public batchId: string | batchIdInfo,
        public purchaseId: string,
        public vaccineName: string,
        public vaccinePrice: number,
        public quantity: number,
        public totalAmount: number,
        public _id: string,
        public date: string
    ){}
}
export class VaccineDatas{
    constructor(
        public batchId: batchIdInfo,
        public purchaseId: string,
        public vaccineName: string,
        public vaccinePrice: number,
        public quantity: number,
        public totalAmount: number,
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

// ✅ New: Vaccine Summary Response
export class VaccineSummary {
  constructor(
    public _id: string,
    public batchId: batchIdInfo,
    public totalVaccineAmount: number,
    public dateUpdated: string
  ) {}
}

export class VaccineSummaryResponse {
  constructor(
    public message: string,
    public data: VaccineSummary
  ) {}
}