import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { type, email, subject, message } = await req.json();
    console.table({ type, email, subject, message });
    if (!type) {
      return new Response(JSON.stringify({ error: "Email type is required" }), {
        status: 400,
      });
    }

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    let mailOptions;

    if (type === "download") {
      if (!email) {
        return new Response(JSON.stringify({ error: "Email is required" }), {
          status: 400,
        });
      }

      mailOptions = {
        from: `"TaskMama App" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Download TaskMama App",
        html: `
          <div style="font-family: sans-serif; color: #333; line-height: 1.5; padding: 20px; max-width: 600px;">
            <h2 style="color: #B0A2DA;">Hello!</h2>
            <p>Thank you for your interest in <strong>TaskMama</strong>. Download the app using the links below:</p>
            
            <div style="display: flex; gap: 15px; margin-top: 20px;">
              <a href="https://apps.apple.com/app/idYOUR_APPLE_ID" target="_blank" 
                 style="display: flex; align-items: center; gap: 8px; padding: 10px 15px; background-color: #B0A2DA; color: #fff; border-radius: 8px; text-decoration: none; font-weight: bold;">
                <img src="http://localhost:3000/icons/applestore.png" alt="Apple Store" width="20" />
                Apple Store
              </a>
              <a href="https://play.google.com/store/apps/details?id=YOUR_APP_PACKAGE" target="_blank"
                 style="display: flex; align-items: center; gap: 8px; padding: 10px 15px; background-color: #B0A2DA; color: #fff; border-radius: 8px; text-decoration: none; font-weight: bold;">
                <img src="http://localhost:3000/icons/playstore.png" alt="Google Play" width="20" />
                Google Play
              </a>
            </div>

            <p style="margin-top: 30px; font-size: 14px; color: #555;">Enjoy TaskMama – your micro-tasking & earning app!</p>
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

      mailOptions = {
        from: `"Contact Form" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER, // your email
        subject: `Contact Form: ${subject}`,
        html: `
          <div style="font-family: sans-serif; color: #333; line-height: 1.5; padding: 20px; max-width: 600px;">
            <h2 style="color: #B0A2DA;">New Contact Form Submission</h2>
            <p><strong>From:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
        `,
      };
    } else {
      return new Response(JSON.stringify({ error: "Invalid email type" }), {
        status: 400,
      });
    }

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
