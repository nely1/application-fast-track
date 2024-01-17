import { PrismaClient } from "@prisma/client";

export const GET = async (request: Request, {params}: any): Promise<Response> => {

    try {
        const prisma = new PrismaClient();
        // id is actually the email for now
        const companyEmail = params.id;
        
        const company = await prisma.company.findUnique({where: {email: companyEmail}})
        const postings = await prisma.posting.findMany({where: {companyId: company?.id}, include: {applications: true}});
        
        return new Response(JSON.stringify(postings), {status: 200});
    }
    catch (error: any) {
        console.log(error.message);
        return new Response(error, {status: 500});
    }


    


}