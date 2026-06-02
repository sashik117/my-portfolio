import "dotenv/config";
import nodemailer from "nodemailer";

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
  CONTACT_TO,
  SMTP_TEST_TO
} = process.env;

const recipient = SMTP_TEST_TO || CONTACT_TO;

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !recipient) {
  console.log("SMTP verification skipped: SMTP_HOST, SMTP_USER, SMTP_PASS or recipient is missing.");
  process.exit(0);
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT || 587),
  secure: Number(SMTP_PORT) === 465,
  auth: {
    pass: SMTP_PASS,
    user: SMTP_USER
  }
});

await transporter.verify();
await transporter.sendMail({
  from: SMTP_FROM || SMTP_USER,
  subject: "Portfolio SMTP verification",
  text: "SMTP verification succeeded for Oleksandra portfolio.",
  to: recipient
});

console.log(`SMTP verification email sent to ${recipient}.`);
