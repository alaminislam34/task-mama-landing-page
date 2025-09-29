import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { type, email, subject, message } = await req.json();

    if (!type) {
      return new Response(JSON.stringify({ error: "Email type is required" }), {
        status: 400,
      });
    }

    // 1. Nodemailer Transporter Setup
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER, // Your full email address
        pass: process.env.SMTP_PASS, // This MUST be the Google App Password (ensure this is correct!)
      },
    });

    let mailOptions;

    // --- DOWNLOAD EMAIL LOGIC (Sends to the user's provided 'email') ---
    if (type === "download") {
      if (!email) {
        return new Response(JSON.stringify({ error: "Email is required" }), {
          status: 400,
        });
      }

      const appStoreLink = "YOUR_APPLE_STORE_LINK";
      const playStoreLink = "YOUR_GOOGLE_PLAY_LINK";
      const appleIconUrl =
        "https://taskmama-landing-page.vercel.app/icons/applestore.png";
      const playIconUrl =
        "https://taskmama-landing-page.vercel.app/icons/playstore.png";

      mailOptions = {
        from: `"TaskMama App" <${process.env.SMTP_USER}>`,
        to: email, // <-- Sends to the user who requested the link
        subject: "Download TaskMama App",

        text: `
          Hello there!
          
          Thank you for your interest in TaskMama. Download the app using the links below:
          
          Apple Store: ${appStoreLink}
          Google Play: ${playStoreLink}
          
          Enjoy TaskMama App!
        `,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; color: #333; line-height: 1.5; max-width: 600px; margin: 40px auto; background-color: #f9f9f9; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
            
            <div style="padding: 30px 40px 20px; text-align: center; border-bottom: 3px solid #B0A2DA;">
              <h1 style="color: #333; font-size: 24px; margin: 0 0 10px;">Your TaskMama Download Link</h1>
              <p style="font-size: 16px; color: #555; margin: 0;">Hello there!</p>
            </div>

            <div style="padding: 30px 40px; text-align: center;">
              <p style="font-size: 17px; color: #555; margin-bottom: 35px;">
                  Thank you for your interest in <strong>TaskMama</strong>. Click on your preferred store below to download the app and get started!
              </p>

              <!-- BUTTON CONTAINER (FIXED: Removed redundant nested div) -->
              <div style="text-align: center; margin-bottom: 30px; padding: 10px 0;">
                <div style="display: inline-block; white-space: nowrap;">
                    <a href="${appStoreLink}" target="_blank" rel="noopener noreferrer" style="margin: 0 10px; display: inline-block;">
                        <img src="${appleIconUrl}" alt="Apple Store Download" style="width: 135px; height: auto; border: none; display: block;"> 
                    </a>
                    <a href="${playStoreLink}" target="_blank" rel="noopener noreferrer" style="margin: 0 10px; display: inline-block;">
                        <img src="${playIconUrl}" alt="Google Play Download" style="width: 135px; height: auto; border: none; display: block;">
                    </a>
                </div>
              </div>

              <p style="font-size: 14px; color: #777; margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">
                  If the links do not work, copy and paste this URL into your browser: [Link Placeholder]
              </p>
            </div>

            <div style="padding: 15px 40px; background-color: #B0A2DA; border-radius: 0 0 12px 12px; text-align: center;">
              <p style="font-size: 14px; color: #ffffff; margin: 0;">
                  Enjoy <strong>TaskMama App</strong>!
              </p>
            </div>
          </div>
        `,
      };
    } else if (type === "contact") {
      if (!email || !subject || !message) {
        return new Response(
          JSON.stringify({ error: "All fields are required" }),
          { status: 400 }
        );
      }

      const recipientEmail =
        process.env.CONTACT_RECIPIENT_EMAIL || process.env.SMTP_USER;

      mailOptions = {
        from: `"Contact Form" <${process.env.SMTP_USER}>`,
        to: recipientEmail, // <-- Sends to your administrative email
        subject: `Contact Form: ${subject}`,

        text: `
            New Contact Form Submission:
            From: ${email}
            Subject: ${subject}
            Message:
            ${message}
        `,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 8px 25px rgba(0,0,0,0.1);">
            
            <div style="background-color: #B0A2DA; padding: 25px 30px; border-radius: 12px 12px 0 0; text-align: center;">
                <h2 style="color: #ffffff; font-size: 22px; margin: 0;">TaskMama Contact Submission</h2>
            </div>

            <div style="padding: 30px 40px;">
                <p style="font-size: 16px; color: #444; margin-bottom: 25px;">
                    A new submission has been received from the website contact form.
                </p>

                <div style="margin-bottom: 25px;">
                    <div style="margin-bottom: 15px; border-left: 3px solid #E6E0F4; padding-left: 15px;">
                        <strong style="display: block; font-size: 14px; color: #B0A2DA; text-transform: uppercase; letter-spacing: 0.5px;">Sender Email</strong>
                        <p style="font-size: 17px; color: #333; margin: 4px 0 0;">${email}</p>
                    </div>

                    <div style="border-left: 3px solid #E6E0F4; padding-left: 15px;">
                        <strong style="display: block; font-size: 14px; color: #B0A2DA; text-transform: uppercase; letter-spacing: 0.5px;">Subject</strong>
                        <p style="font-size: 17px; color: #333; margin: 4px 0 0;">${subject}</p>
                    </div>
                </div>

                <h3 style="font-size: 18px; color: #333; margin-top: 0; margin-bottom: 10px;">Message Details:</h3>
                <div style="font-size: 16px; background-color: #f0f0f0; padding: 15px; border-radius: 8px; border: 1px solid #ddd; white-space: pre-wrap; word-wrap: break-word;">
                    ${message}
                </div>
                
            </div>

            <div style="padding: 15px 40px; text-align: center; border-top: 1px solid #eee;">
                <p style="font-size: 12px; color: #999; margin: 0;">
                    (This is an automated notification.)
                </p>
            </div>

          </div>
        `,
      };
    } else {
      return new Response(JSON.stringify({ error: "Invalid email type" }), {
        status: 400,
      });
    }

    // 2. Send Email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Email sent successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
}
