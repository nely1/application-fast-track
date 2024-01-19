import { prisma } from "@/prisma/client";
import {GetGmails} from '@/lib/googleapis';
import { GmailData } from "@/lib/interfaces";

export const GET = async (request: Request, {params}: any): Promise<Response> => {

    try {
        let dataToInsert = [];
        const companyEmail = params.id;
        let postingIds: Record<string, number> = {};
        const company = await prisma.company.findUnique({where: {email: companyEmail}})
        

        const postings = await prisma.posting.findMany({where: {companyId: company?.id}, include: {applications: true}});
        postings.forEach((posting) => {
            postingIds[posting.title] = posting.id;
        })
        
        // might wanna put this in a new function
        const newApplications: GmailData[] = await GetGmails('') as GmailData[]; // parameter may change later    
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

        await prisma.application.createMany({data: dataToInsert});
        
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
