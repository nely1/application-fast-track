import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import NESEmail from '@/app/emails/email';

const resend = new Resend(process.env.RESEND_KEY);

export async function POST(request: Request) {
  const { name } = await request.json();
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'engjiaee@gmail.com',
    subject: 'Application outcome',
    react: NESEmail({
        name
    }), 
  });
  
  return NextResponse.json({
    status: 'Ok'
  })
}