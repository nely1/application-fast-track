import { DateTime } from "next-auth/providers/kakao";

export interface Posting {
    id: number,
    title: string,
    description: string|null,
    companyId: number,
    closingDate: DateTime,
    closed: Boolean     
    applications: Array<any>
}

export interface Application {
    id: number
    postingId: number
    email: string
    resumeFile: string
}