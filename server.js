const soap = require('soap');
const http = require('node:http');
const fs = require('node:fs');
const nodemailer = require('nodemailer');

process.loadEnvFile();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
});

const service = {
  MailService: {
    MailPort: {
      SendEmail: async function (args) {
        const to = args.to;
        const subject = args.subject;
        const html = args.html;
        const text = args.text;

        const info = await transporter.sendMail({
          from: `<${process.env.SMTP_FROM}>`,
          to: to,
          subject: subject,
          text: text,
          html: html,
        });

        console.log('Message sent: %s', info.messageId);

        return {
          confirmation: `Email sent to ${to} with Message ID: ${info.messageId}`
        };
      }
    }
  }
}

const xml = fs.readFileSync('service.wsdl', 'utf8');

const port = process.env.PORT || 8000;
const server = http.createServer((request, response) => {
  response.end('404: Not Found: ' + request.url);
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  soap.listen(server, '/wsdl', service, xml);
});
