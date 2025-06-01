// app/api/contact/route.ts (Next.js 13+)
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const {name, email, message } = await req.json();

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
 html: `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
      <p>Dear Team,</p>
      <p>${message.replace(/\n/g, '<br>')}</p>

      <br />
      <p>Kind regards,</p>
      <p>${name || 'Anonymous'}</p>
      <p>Email: ${email}</p>

      <hr style="margin-top: 30px;"/>
      <p style="font-size: 13px; color: #999;">Sent via MDSCravex Contact Form</p>
    </div>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Email failed:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
  }
}
