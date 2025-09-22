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
         <div style="font-family: sans-serif; color: #333; line-height: 1.5; padding: 30px; max-width: 600px; margin: 40px auto; background-color: #fff; border-radius: 16px; box-shadow: 0 8px 20px rgba(0,0,0,0.1); text-align: center;">
  <h2 style="color: #B0A2DA; font-size: 28px; margin-bottom: 15px;">Hello there!</h2>
  
  <p style="font-size: 16px; color: #555; margin-bottom: 25px;">
    Thank you for your interest in <strong>TaskMama</strong>. Download the app using the links below:
  </p>

  <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 25px;">
    <a href="https://apps.apple.com/app/idYOUR_APPLE_ID" target="_blank" rel="noopener noreferrer">
      <img src="https://taskmama-landing-page.vercel.app/icons/applestore.png" alt="Apple Store" style="width: 120px; cursor: pointer; transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
    </a>
    <a href="https://play.google.com/store/apps/details?id=YOUR_APP_PACKAGE" target="_blank" rel="noopener noreferrer">
      <img src="https://taskmama-landing-page.vercel.app/icons/playstore.png" alt="Google Play" style="width: 120px; cursor: pointer; transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
    </a>
  </div>

  <p style="font-size: 14px; color: #777;">
    Enjoy <strong>TaskMama</strong>
  </p>
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
         <div style="font-family: sans-serif; color: #333; line-height: 1.6; padding: 25px; max-width: 600px; margin: 20px auto; background-color: #f9f9f9; border-radius: 12px; box-shadow: 0 6px 15px rgba(0,0,0,0.1); border-left: 4px solid #B0A2DA;">
  <h2 style="color: #B0A2DA; font-size: 24px; margin-bottom: 15px; text-align: center;">New Contact Form Submission</h2>

  <p style="margin-bottom: 10px; font-size: 16px;"><strong>From:</strong> ${email}</p>
  <p style="margin-bottom: 10px; font-size: 16px;"><strong>Subject:</strong> ${subject}</p>
  <p style="margin-bottom: 10px; font-size: 16px;"><strong>Message:</strong></p>
  <p style="margin-bottom: 0; font-size: 16px; background-color: #fff; padding: 10px 12px; border-radius: 8px; border: 1px solid #ddd;">${message}</p>
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
