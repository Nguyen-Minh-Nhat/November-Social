const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env;

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  OAUTH_PLAYGROUND,
);

// send mail
const sendEmail = (to, url, txt, type, recipientName) => {
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
  });

  const accessToken = oauth2Client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_EMAIL_ADDRESS,
      clientId: MAILING_SERVICE_CLIENT_ID,
      clientSecret: MAILING_SERVICE_CLIENT_SECRET,
      refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
      accessToken,
    },
  });

  const register = ` <p style="cursor: auto; color: #737f8d; font-family: Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif; font-size: 16px; line-height: 24px; text-align: left;">
            Thanks for registering an account with
            <span style="color: #6ba4e9;">NovSocial</span>! You're the coolest person in all the land (and I've met a lot of really cool people).
        </p>
        <span style="cursor: auto; color: #737f8d; font-family: Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif; font-size: 16px; line-height: 24px; text-align: left;">
            Before we get started, we'll need to verify your email.
        </span>
`;

  const forgotPassword = ` <p style="cursor: auto; color: #737f8d; font-family: Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif; font-size: 16px; line-height: 24px; text-align: left;">
             You are required to enter the verification code below to reset your password. Please enter the code in 5 minutes
        </p>
        <span style="cursor: auto; color: #737f8d; font-family: Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif; font-size: 16px; line-height: 24px; text-align: left;">
             Your verification code: 
        </span>
`;

  const mailOptions = (type = "register") => {
    return {
      from: "SENDER_EMAIL_ADDRESS",
      to: to,
      subject: "NovSocial",
      html: `
        <div style="max-width: 700px; margin: auto; font-size: 110%; border-radius: 12px; border: 1px solid #d7d8d9; overflow: hidden;">
    <div style="width: 100%; height: 100px; background: #6ba4e9;">
        <div style="cursor: auto; color: white; font-family: Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif; font-size: 36px; font-weight: 600; text-align: center; line-height: 100px;">
            Welcome to NovSocial!
        </div>
    </div>

    <div style="padding: 20px;">
        <h3 style="font-family: Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif; font-weight: 500; font-size: 20px; color: #4f545c; letter-spacing: 0.27px;">
            Hight ${recipientName},
        </h3>
        ${type == "register" ? register : forgotPassword}

        <div style="text-align: center; margin-top: 20px;">
            <a
                href="${url}"
                style="
                    font-family: Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
                    background: #6ba4e9;
                    text-decoration: none;
                    color: white;
                    padding: 12px 12px;
                    margin: 10px 0;
                    display: inline-block;
                    border-radius: 8px;
                    font-weight: bold;
                    font-size: 20px;
                "
            >
                ${txt}
            </a>
        </div>
    </div>
</div>
`,
    };
  };

  smtpTransport.sendMail(mailOptions(type), (err, info) => {
    if (err) return err;
    return info;
  });
};

module.exports = sendEmail;
