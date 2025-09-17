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
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #333; line-height: 1.5; padding: 20px; max-width: 600px; background-color: #f9f9f9; border-radius: 12px;">
            <h2 style="color: #B0A2DA; margin-bottom: 10px;">Hello!</h2>
            <p style="margin-bottom: 20px;">Thank you for your interest in <strong>TaskMama</strong>. Download the app using the links below:</p>
            
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              
              <!-- Apple Store Button -->
              <a href="https://apps.apple.com/app/idYOUR_APPLE_ID" target="_blank" 
                 style="display: inline-flex; align-items: center; padding: 10px 18px; background-color: #000; color: #fff; border-radius: 12px; text-decoration: none; font-weight: 600; transition: background 0.3s;">
                <i class="fa-brands fa-apple" style="font-size: 24px; margin-right: 10px;"></i>
                <div style="display: flex; flex-direction: column; line-height: 1.1;">
                  <span style="font-size: 10px;">Download on the</span>
                  <span style="font-size: 16px;">App Store</span>
                </div>
              </a>

              <!-- Play Store Button -->
              <a href="https://play.google.com/store/apps/details?id=YOUR_APP_PACKAGE" target="_blank" 
                 style="display: inline-flex; align-items: center; padding: 10px 18px; background-color: #fff; color: #000; border-radius: 12px; border: 1px solid #ddd; text-decoration: none; font-weight: 600; transition: background 0.3s;">
                <i class="fa-brands fa-google-play" style="font-size: 24px; margin-right: 10px;"></i>
                <div style="display: flex; flex-direction: column; line-height: 1.1;">
                  <span style="font-size: 10px;">Get it on</span>
                  <span style="font-size: 16px;">Google Play</span>
                </div>
              </a>

            </div>

            <p style="margin-top: 30px; font-size: 14px; color: #555;">Enjoy TaskMama – your micro-tasking & earning app!</p>
          </div>

          <!-- Font Awesome CDN for icons (works in browser, not email clients) -->
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
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
        to: process.env.SMTP_USER,
        subject: `Contact Form: ${subject}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #333; line-height: 1.5; padding: 20px; max-width: 600px; background-color: #f9f9f9; border-radius: 12px;">
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
