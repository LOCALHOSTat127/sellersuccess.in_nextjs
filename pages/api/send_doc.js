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

export default async function docRequest(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { send_to, customer_details, file } = req.body;

  let template;
  try {
    template = fs.readFileSync(path.join(process.cwd(), 'templates/doc_req.html'), 'utf8');
  } catch (error) {
    console.error('Error reading email template:', error);
    return res.status(500).json({ message: 'Cannot fetch email template' });
  }

  if (!template) {
    return res.status(500).json({ message: 'Template is empty' });
  }

  const filePath = path.join(process.cwd(), 'data/pdfs', `${file.ID}.pdf`);
  console.log(filePath);
  if (!fs.existsSync(filePath)) {
    return res.status(400).json({ message: 'Requested PDF file does not exist' });
  }

  const customerDetails = {
    customerName: customer_details.name !== "" ? customer_details.name :  'Client',
    customerEmail: customer_details.email || send_to,
    customerMobile: customer_details.phone || 'N/A',
    timestamp: new Date().toLocaleString(),
  };

  const htmlContent = template
    .replace('{{customerName}}', customerDetails.customerName)
    .replace('{{timestamp}}', customerDetails.timestamp);

  const mailOptions = {
    from: process.env.NEXT_PUBLIC_SERVICE_EMAIL,
    to: send_to,
    subject: `Document Requested from SellerSuccess`,
    text: `You requested the document: ${file.name}`,
    html: htmlContent,
    attachments: [
      {
        filename: file.name,
        path: filePath,
      },
    ],
  };

  try {
    await TRANSPORTER.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
 
    res.status(500).json({ message: 'Error sending email' });
  }
}
