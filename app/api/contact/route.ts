import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type ContactFormData = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  website?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!apiKey || !contactEmail) {
      console.error("Missing Resend environment variables.");

      return NextResponse.json(
        {
          success: false,
          message: "Email service is not configured.",
        },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);
    const body = (await request.json()) as ContactFormData;

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim().toLowerCase() ?? "";
    const company = body.company?.trim() ?? "";
    const message = body.message?.trim() ?? "";
    const website = body.website?.trim() ?? "";

    // Honeypot spam protection
    if (website) {
      return NextResponse.json({
        success: true,
        message: "Message sent successfully.",
      });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and message are required.",
        },
        { status: 400 },
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        {
          success: false,
          message: "Name is too long.",
        },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 },
      );
    }

    if (company.length > 150) {
      return NextResponse.json(
        {
          success: false,
          message: "Company name is too long.",
        },
        { status: 400 },
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        {
          success: false,
          message: "Message must be at least 10 characters.",
        },
        { status: 400 },
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        {
          success: false,
          message: "Message is too long.",
        },
        { status: 400 },
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = escapeHtml(company || "Not provided");
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

    const { data, error } = await resend.emails.send({
      from: "Synqo AI Website <onboarding@resend.dev>",
      to: [contactEmail],
      replyTo: email,
      subject: `New Synqo AI enquiry from ${name}`,
      text: [
        "New website enquiry",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || "Not provided"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <div style="margin:0;padding:32px;background:#050b16;font-family:Arial,sans-serif;color:#eaf6ff;">
          <div style="max-width:640px;margin:0 auto;background:#091426;border:1px solid #17395c;border-radius:20px;overflow:hidden;">
            <div style="padding:28px;background:linear-gradient(135deg,#0b1b33,#062f5a);">
              <h1 style="margin:0;font-size:26px;color:#ffffff;">
                New Synqo AI Enquiry
              </h1>
              <p style="margin:8px 0 0;color:#9ed8ff;">
                A visitor submitted the website contact form.
              </p>
            </div>

            <div style="padding:28px;">
              <p style="margin:0 0 14px;">
                <strong style="color:#63c8ff;">Name:</strong>
                ${safeName}
              </p>

              <p style="margin:0 0 14px;">
                <strong style="color:#63c8ff;">Email:</strong>
                ${safeEmail}
              </p>

              <p style="margin:0 0 24px;">
                <strong style="color:#63c8ff;">Company:</strong>
                ${safeCompany}
              </p>

              <div style="padding:20px;background:#050d19;border:1px solid #173451;border-radius:14px;line-height:1.7;color:#d7e9f7;">
                ${safeMessage}
              </div>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Email could not be sent. Please try again.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully.",
        emailId: data?.id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 },
    );
  }
}
