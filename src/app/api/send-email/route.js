import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { type, email, subject, message } = await req.json();

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
      // Download app email
      if (!email) {
        return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
      }

      mailOptions = {
        from: `"TaskMama App" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Download TaskMama App",
        html: `
          <h2>Hello!</h2>
          <p>Click the link below to download the TaskMama app:</p>
          <ul>
            <li><a href="https://apps.apple.com/app/idYOUR_APPLE_ID" target="_blank">Apple Store</a></li>
            <li><a href="https://play.google.com/store/apps/details?id=YOUR_APP_PACKAGE" target="_blank">Google Play</a></li>
          </ul>
        `,
      };
    } else if (type === "contact") {
      // Contact form email
      if (!email || !subject || !message) {
        return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
      }

      mailOptions = {
        from: `"Contact Form" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER, // send to your email
        subject: `Contact Form: ${subject}`,
        html: `
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      };
    } else {
      return new Response(JSON.stringify({ error: "Invalid email type" }), { status: 400 });
    }

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: "Email sent successfully!" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
  }
}
