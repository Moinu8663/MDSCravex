// app/api/contact/route.ts (Next.js 13+)
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { email, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
  console.log(process.env.GMAIL_USER,)

  const mailOptions = {
    from: email,           
    to: process.env.GMAIL_USER,  
    subject: 'For MDSCraves Query.',
    text: message,                         
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Email failed:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
  }
}
