import { PrismaClient } from "@prisma/client";


export const GET = async (request: Request, params: any) => {

    try {
        const prisma = new PrismaClient();

        const applications = await prisma.application.findMany({where: {postingId: params.id}});
        
        return new Response(JSON.stringify(applications), {status:200});
        
    }
    catch (error: any) {
        console.log(error.message);
        return new Response(error, {status: 500});
    }

}