import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import NESEmail from '@/app/emails/email';
import {prisma} from '@/prisma/client'

const resend = new Resend(process.env.RESEND_KEY);

export async function POST(request: Request) {
  const  comments  = await request.json();
  const formatting = comments.formatting;
  const qualifications = comments.qualifications;
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'engjiaee@gmail.com',  // email of applicant
    subject: 'Application outcome',
    react: NESEmail({
        formatting,
        qualifications,
        "posting"  // posting of applicant
    }), 
  });
  
  return NextResponse.json({
    status: 'Ok'
  })
}

export async function GET(request: Request, {params}: any) {
  try {
    const id = parseInt(params.id);
    const application = await prisma.application.findUnique({where :{id: id}});
    console.log(application);
    return NextResponse.json({
      data: application,
      status: 'Ok'});
  }
  catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      status:'error'
    })
  }
}