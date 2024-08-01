import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const TRANSPORTER = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NEXT_PUBLIC_SERVICE_EMAIL,
    pass: process.env.NEXT_PUBLIC_SERVICE_EMAIL_PWD,
  },
  tls: {
    rejectUnauthorized: true,
  },
});

export default async function POST(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { send_to, customer_details } = req.body;

  let template;
  try {
    template = fs.readFileSync(path.join(process.cwd(), 'templates/new_cb_req.html'), 'utf8');
  } catch (error) {
    return res.status(500).json({ message: 'Cannot fetch email template' });
  }

  if (!template) {
    return res.status(500).json({ message: 'Template is empty' });
  }

  const customerDetails = {
    customerName: customer_details.name || 'N/A',
    customerEmail: customer_details.email || send_to,
    customerMobile: customer_details.phone || 'N/A',
    timestamp: new Date().toLocaleString(),
  };

  const htmlContent = template
    .replace('{{customerName}}', customerDetails.customerName)
    .replace('{{customerEmail}}', customerDetails.customerEmail)
    .replace('{{customerMobile}}', customerDetails.customerMobile)
    .replace('{{timestamp}}', customerDetails.timestamp);

  const mailOptions = {
    from: process.env.NEXT_PUBLIC_SERVICE_EMAIL,
    to: process.env.NEXT_PUBLIC_SERVICE_EMAIL,
    subject: `New Customer Callback Request ${new Date().toLocaleDateString()}`,
    text: "You have a new customer callback request.",
    html: htmlContent,
  };

  try {
    await TRANSPORTER.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
}
