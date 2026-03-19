import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
const SMTP_SECURE = process.env.SMTP_SECURE === "true";
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const SMTP_FROM_EMAIL = process.env.SMTP_FROM_EMAIL;

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !SMTP_FROM_EMAIL) {
    throw new Error(
      "SMTP configuration is missing (SMTP_HOST, SMTP_USER, SMTP_PASSWORD, SMTP_FROM_EMAIL are required)",
    );
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });
  }

  return transporter;
}

export async function sendLicenseEmail(input: {
  toEmail: string;
  licenseKey: string;
}): Promise<void> {
  const mailer = getTransporter();

  await mailer.sendMail({
    from: SMTP_FROM_EMAIL,
    to: input.toEmail,
    subject: "Your OfflineTools license key",
    text: [
      `Hi,`,
      ``,
      `Thank you for purchasing OfflineTools.`,
      ``,
      `Email: ${input.toEmail}`,
      `License key: ${input.licenseKey}`,
      ``,
      `To unlock premium features in the desktop app, open Settings and enter your email and license key.`,
      ``,
      `OfflineTools`,
    ].join("\n"),
  });
}
