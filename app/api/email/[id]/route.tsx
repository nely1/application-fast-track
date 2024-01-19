import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import NESEmail from '@/app/emails/email';
import {prisma} from '@/prisma/client'
import { ProcessEmailString } from '@/lib/googleapis';

const resend = new Resend(process.env.RESEND_KEY);

export async function POST(request: Request) {
  const  params  = await request.json();
  const formatting = params.formatting;
  const qualifications = params.qualifications;
  const email = params.email.substring(1, params.email.length - 1);
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,  // email of applicant
    subject: 'Application outcome',
    react: NESEmail({
        formatting,
        qualifications,
        posting: 'Software Engineer position at NES'
    }), 
  });
  console.log('everything is done');
  return NextResponse.json({
    status: 'Ok'
  })
}

export async function GET(request: Request, {params}: any) {
  try {
    const id = parseInt(params.id);
    const application = await prisma.application.findUnique({where :{id: id}});
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