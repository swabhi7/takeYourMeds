export interface Med {
    id: string,
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
        taken?: boolean
    }[],
    myReview?: string
}