import nodemailer, { TransportOptions } from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
} as TransportOptions);

interface EmailParams {
  email: string;
  subject: string;
  html: string;
}

function send({ email, subject, html }: EmailParams) {
  return transporter.sendMail({
    to: email,
    subject,
    html,
  });
}

function sendActivationEmail(email: string, token: string) {
  const href = `${process.env.CLIENT_HOST}/activate/${token}`;

  const html = `
  <h1>Activate account</h1>
  <a href="${href}">${href}</a>
  `;

  return send({
    email,
    html,
    subject: 'Activate account',
  });
}

export const emailService = {
  sendActivationEmail,
  send,
};
