const nodemailer = require('nodemailer');
const { google } = require('googleapis');
// Create a transporter using Gmail credentials

const OAuth2 = google.auth.OAuth2;

const ClientId = '524708119282-t6r7h1b93355jalho2m75ikkjgrhhi3k.apps.googleusercontent.com';
const ClientSecret = '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';
const RefreshToken = '1//04SEB0qDuYC5qCgYIARAAGAQSNwF-L9Iri77xSmvAMLfU9-A3r3kZpE9i876vsoYE5jMrkY_Kx52mVZofELham2Zc_mjXcGbqUJc';


const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    ClientId,
    ClientSecret,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: RefreshToken
  });

  const accessToken = await oauth2Client.getAccessToken();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "rithiishwerya@paizatto.com",
      accessToken,
      clientId: ClientId,
      clientSecret: ClientSecret,
      refreshToken: RefreshToken
    }, tls: {
      rejectUnauthorized: false
    }
  });

  return transporter;
};


async function sendEmail(toemail, subject, text) {
  return new Promise((resolve, reject) => {
    setImmediate(async () => {
      try {
        const mailOptions = {
          from: 'no-reply.consense.com', // Sender email address
          to: toemail, // Recipient email address
          subject: subject,
          text: text
        };
        let emailTransporter = await createTransporter();
        emailTransporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            reject({
              code: 201,
              success: false,
              status: error.stack,
              timestamp: new Date()
            });
          } else {
            console.log('Email sent:', info.response);
            resolve({
              code: 200,
              success: true,
              status: info.response,
              timestamp: new Date()
            })
          }
        });
      } catch (error) {
        console.error(error);
        reject({
          success: false,
          code: 201,
          Status: "Database Error",
          "timestamp": new Date()
        });
      }
    });
  });
}

module.exports = {
  sendEmail
};