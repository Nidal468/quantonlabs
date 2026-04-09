import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Quanton Labs",
  description: "Privacy Policy for Quanton Labs and the Quanton OS platform.",
};

export default function PrivacyPage() {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        paddingTop: "120px",
        paddingBottom: "120px",
      }}
    >
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "0 32px",
          fontFamily: "Manrope, sans-serif",
        }}
      >
        <div
          style={{
            height: "3px",
            width: "48px",
            background: "linear-gradient(to right, #2B60EB, #8B37EA)",
            borderRadius: "2px",
            marginBottom: "32px",
          }}
        />

        <h1
          style={{
            fontSize: "40px",
            fontWeight: 700,
            color: "#1F2937",
            marginBottom: "12px",
            lineHeight: 1.2,
          }}
        >
          Privacy Policy
        </h1>

        <p style={{ fontSize: "14px", color: "#6B7280", marginBottom: "48px" }}>
          Last updated: April 2026
        </p>

        {[
          {
            title: "Who we are",
            body: `Quanton Labs is a trade name of Remington Enterprises LLC, a South Carolina limited liability company. We build and operate Quanton OS, an AI-integrated operating system for growth-stage businesses. References to "Quanton Labs", "we", "us", or "our" in this policy refer to Remington Enterprises LLC operating as Quanton Labs. Our primary website is quantonlabs.com.`,
          },
          {
            title: "What information we collect",
            body: `We collect information you provide directly to us when you complete the AI Readiness Assessment, submit a contact or inquiry form, book a discovery call, or subscribe to product updates. This includes your name, business name, email address, phone number, and responses to assessment questions. We may also collect information automatically when you visit our website, including your IP address, browser type, pages visited, time spent on pages, and referring URLs through analytics tools. We use cookies and similar tracking technologies to understand how visitors interact with our site and to improve the user experience.`,
          },
          {
            title: "How we use your information",
            body: `We use the information we collect to respond to your inquiries and assessment submissions, to contact you about our services and engagement process, to send product updates and announcements where you have subscribed, to analyze and improve our website and marketing, and to comply with legal obligations. We do not sell your personal information to third parties. We do not use your information for automated decision-making that produces legal or similarly significant effects without human review.`,
          },
          {
            title: "Data collection and AI systems",
            body: `Quanton Labs is building AI-integrated infrastructure for growth-stage businesses. As part of our product development and service delivery, we may collect and process operational business data provided by clients during engagement phases. This data is used exclusively to configure, operate, and improve the Quanton OS deployment for the client and is governed by the terms of the applicable Engagement Agreement. We do not use client operational data for any purpose outside the scope of the engagement without explicit written consent.`,
          },
          {
            title: "Cookies and tracking",
            body: `Our website uses cookies to support core functionality, analyze site traffic, and improve the user experience. You can control cookie settings through your browser. Disabling cookies may affect certain features of the site. We may use third-party analytics services including but not limited to Google Analytics to understand website usage patterns. These services have their own privacy policies governing the use of information collected on our behalf.`,
          },
          {
            title: "Data retention",
            body: `We retain personal information for as long as necessary to fulfill the purposes for which it was collected, to comply with legal obligations, to resolve disputes, and to enforce our agreements. Assessment and inquiry data is retained for a minimum of 24 months. Subscriber data is retained until you unsubscribe. Client engagement data is retained in accordance with the terms of the applicable Engagement Agreement.`,
          },
          {
            title: "Your rights",
            body: `You have the right to access, correct, or request deletion of your personal information held by Quanton Labs. You may also request that we restrict processing of your information or object to its use in certain circumstances. To exercise any of these rights, contact us at growth@quantonlabs.com. We will respond to all requests within 30 days.`,
          },
          {
            title: "Third-party services",
            body: `Our website and platform may contain links to or integrations with third-party services. This Privacy Policy does not apply to those services. We encourage you to review the privacy policies of any third-party services you access through our platform. We are not responsible for the privacy practices of third parties.`,
          },
          {
            title: "Security",
            body: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction. Quanton OS operates on proprietary server infrastructure with multiple security layers including encryption in transit, access controls, and regular security monitoring. No method of transmission over the internet is completely secure, and we cannot guarantee absolute security.`,
          },
          {
            title: "Changes to this policy",
            body: `We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will post the updated policy on this page with a revised effective date. Continued use of our website or services after any changes constitutes your acceptance of the updated policy.`,
          },
          {
            title: "Contact",
            body: `If you have questions or concerns about this Privacy Policy or how we handle your information, contact us at growth@quantonlabs.com or by phone at +1 929-298-2162. Remington Enterprises LLC operating as Quanton Labs, United States.`,
          },
        ].map((section, i) => (
          <div key={i} style={{ marginBottom: "40px" }}>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#1F2937",
                marginBottom: "12px",
              }}
            >
              {section.title}
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#374151",
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              {section.body}
            </p>
          </div>
        ))}

        <div
          style={{
            borderTop: "1px solid #E5E7EB",
            paddingTop: "32px",
            marginTop: "16px",
          }}
        >
          <Link
            href="/"
            style={{
              fontSize: "14px",
              color: "#2B60EB",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            ← Back to Quanton Labs
          </Link>
        </div>
      </div>
    </div>
  );
}
