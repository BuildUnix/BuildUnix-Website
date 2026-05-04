import { Resend } from "resend";

export async function POST(req) {
  if (!process.env.RESEND_API_KEY) {
    console.error("CRITICAL: RESEND_API_KEY is not defined in environment variables.");
    return Response.json({ error: "Server configuration error: Missing API Key in Vercel." }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await req.json();
    const { name, email, company, role, size, intent, msg, siteLocation } = body;

    const logoUrl = "https://build-unix-website.vercel.app/brand/buildunix-logo.png";

    // Send both emails in parallel
    const [notification, acknowledgement] = await Promise.all([
      // 1. Notification to info@buildunix.com
      resend.emails.send({
        from: "BuildUNIX <info@buildunix.com>",
        to: ["info@buildunix.com"],
        subject: `New Pilot Request: ${company}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 40px; border-radius: 12px; color: #161210;">
            <div style="text-align: center; margin-bottom: 30px; padding: 20px; background-color: #fcfcfc; border-radius: 8px;">
              <img src="${logoUrl}" alt="BuildUNIX Logo" style="width: 180px; height: auto;" />
            </div>
            <h2 style="color: #E8690A; border-bottom: 2px solid #E8690A; padding-bottom: 12px; margin-bottom: 24px;">New Pilot Request</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 140px;"><strong>Full Name</strong></td>
                <td style="padding: 8px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Work Email</strong></td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #E8690A; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Company</strong></td>
                <td style="padding: 8px 0;">${company}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Role</strong></td>
                <td style="padding: 8px 0;">${role || "Not specified"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Portfolio Size</strong></td>
                <td style="padding: 8px 0;">${size}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Primary Goal</strong></td>
                <td style="padding: 8px 0;">${intent}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Site Location</strong></td>
                <td style="padding: 8px 0;">${siteLocation}</td>
              </tr>
            </table>

            <div style="margin-top: 24px; padding: 20px; background: #f8f8f8; border-radius: 8px; border-left: 4px solid #E8690A;">
              <strong style="display: block; margin-bottom: 8px; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Project Details / Pain Points</strong>
              <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${msg || "No additional details provided."}</p>
            </div>

            <p style="margin-top: 40px; font-size: 11px; color: #999; text-align: center; border-top: 1px solid #eee; padding-top: 20px;">
              This lead was generated from the BuildUNIX website contact form.
            </p>
          </div>
        `,
      }),

      // 2. Acknowledgement to the User
      resend.emails.send({
        from: "BuildUNIX <info@buildunix.com>",
        to: [email],
        subject: `Pilot Request Received — BuildUNIX`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #fff; border: 1px solid #eee; border-radius: 12px; overflow: hidden; color: #161210;">
            <div style="background-color: #fcfcfc; padding: 40px; text-align: center; border-bottom: 1px solid #eee;">
              <img src="${logoUrl}" alt="BuildUNIX Logo" style="width: 220px; height: auto;" />
              <p style="color: #999; margin: 15px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em;">Digitising Construction Execution</p>
            </div>
            <div style="padding: 40px;">
              <h2 style="font-size: 22px; margin-top: 0;">Thanks for your interest, ${name.split(" ")[0]}.</h2>
              <p style="line-height: 1.6; color: #444;">
                We've received your request for a BuildUNIX pilot for <strong>${company}</strong> at your <strong>${siteLocation}</strong> project. Our team is reviewing your details and will be in touch shortly.
              </p>
              <p style="line-height: 1.6; color: #444;">
                A BuildUNIX engineer will reach out to you at this email address shortly to schedule your walkthrough and discuss the next steps for your 30-day free pilot.
              </p>
              
              <div style="margin: 32px 0; padding: 24px; background-color: #f8f8f8; border-radius: 8px; border-left: 4px solid #E8690A;">
                <h3 style="margin: 0 0 12px 0; font-size: 16px;">What happens next?</h3>
                <ol style="margin: 0; padding-left: 20px; color: #666; line-height: 1.8;">
                  <li>Project review & configuration</li>
                  <li>Onboarding session for your PMC team</li>
                  <li>First site goes live (typically within 7 days)</li>
                </ol>
              </div>

              <p style="line-height: 1.6; color: #444;">
                In the meantime, if you have any urgent questions, feel free to reply to this email.
              </p>
              
              <p style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 24px; font-size: 14px; color: #999;">
                Best regards,<br/>
                <strong>The BuildUNIX Team</strong>
              </p>
            </div>
            <div style="background-color: #fcfcfc; padding: 20px; text-align: center; font-size: 12px; color: #bbb; border-top: 1px solid #eee;">
              Hyderabad, IN
            </div>
          </div>
        `,
      }),
    ]);

    if (notification.error || acknowledgement.error) {
      return Response.json({ error: notification.error || acknowledgement.error }, { status: 500 });
    }

    return Response.json({ notification: notification.data, acknowledgement: acknowledgement.data });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
