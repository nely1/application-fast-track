import { prisma } from "@/prisma/client";
import {GetGmails} from '@/lib/googleapis';
import { GmailData } from "@/lib/interfaces";

export const GET = async (request: Request, {params}: any): Promise<Response> => {

    try {
       
        const companyEmail = params.id;
        let postingIds: Record<string, number> = {};
        const company = await prisma.company.findUnique({where: {email: companyEmail}, include: {postings: true}})
        
        if (company && company.postings) {
            const postings = company.postings
            postings.forEach((posting) => {
                postingIds[posting.title] = posting.id;
            })
        }
        const latestUpdate = FindLatestUpdated(company?.postings);
        if ((Date.now() - latestUpdate) >= 60 * 60 * 1000) {
            await GetNewApplications(postingIds);
            
        }
        console.log(Date.now() - latestUpdate);
        console.log(60 * 60 * 1000);
      
        const postings = await prisma.posting.findMany({where: {companyId: company?.id}, include: {applications: true}});
        return new Response(JSON.stringify(postings), {status: 200});
    }
    catch (error: any) {
        console.log(error.message);
        return new Response(error, {status: 500});
    }

}

const ProcessEmailString = (title: string) => {
    const email = title.split(' ')[1];
    return email;
} 

const GetNewApplications = async (postingIds: Record<string, number>) => {
    try {
        let dataToInsert = [];
        const newApplications: GmailData[] = await GetGmails('') as GmailData[]; // parameter may change later   
        
        if (newApplications) {
            newApplications.forEach((application) => {
                let data = {};
                if (application.title in postingIds) {
                    data = {postingId: postingIds[application.title], 
                            email: ProcessEmailString(application.email), 
                            resumeFile: application.fileEncoding,
                            fileName: application.fileName
                            };
                    dataToInsert.push(data);
                }
            })

            return await prisma.application.createMany({data: dataToInsert});
        }
    }
    catch (error: any) {
        console.log(error.message);
    }
}

const FindLatestUpdated = (postings: any[]) => {
    let latest = null;
    for (let i = 0; i < postings.length; i++) {
        if (!latest || postings[i].lastUpdated > latest ) {
            latest = postings[i].lastUpdated;
        }
    }
    return latest;
} 