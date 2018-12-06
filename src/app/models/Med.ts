export interface Med {
    _id: any,
    name: string,
    purpose?: string,
    composition?: string,
    toBeTakenAt: {
        hh: number,
        mm: number,
        amorpm: string,
        timeup?: boolean,
        hourRem?: number,
        minRem?: number,
        taken?: boolean,
        msgSent?:boolean
    }[],
    myReview?: string
}