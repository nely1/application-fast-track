import { prisma } from "@prisma/client";

export const GET = async (request: Request, {params}): Promise<Response> => {

    try {
        // id is actually the email for now
        const companyEmail = params.id;
        
        const company = await prisma.company.findUnique({where: {email: companyEmail}})
        console.log(company);
        
        const postings = await prisma.postings.findMany({where: {companyId: company.id}});
        console.log(postings);
        
        return new Response(postings, {status: 200});
    }
    catch (error: any) {
        console.log(error.message);
        return new Response(error, {status: 500});
    }


    


}