import Link from "next/link";

export const metadata = {
  title: "Terms of Use | Quanton Labs",
  description: "Terms of Use for the Quanton Labs website.",
};

export default function TermsPage() {
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
          Terms of Use
        </h1>

        <p style={{ fontSize: "14px", color: "#6B7280", marginBottom: "48px" }}>
          Last updated: April 2026
        </p>

        {[
          {
            title: "Acceptance of terms",
            body: `By accessing or using the Quanton Labs website at quantonlabs.com, you agree to be bound by these Terms of Use. If you do not agree to these terms, do not use this website. These terms apply to all visitors, users, and others who access or use the site. Use of Quanton Labs services as a client is governed separately by the applicable Engagement Agreement, not by these Terms of Use.`,
          },
          {
            title: "Who we are",
            body: `Quanton Labs is a trade name of Remington Enterprises LLC, a South Carolina limited liability company. Our website is operated from the United States. References to "Quanton Labs", "we", "us", or "our" in these terms refer to Remington Enterprises LLC operating as Quanton Labs.`,
          },
          {
            title: "Use of this website",
            body: `You may use this website for lawful purposes only and in accordance with these Terms of Use. You agree not to use the site in any way that violates applicable laws or regulations, to transmit any unsolicited or unauthorized advertising or promotional material, to impersonate or misrepresent your affiliation with any person or entity, to engage in any conduct that restricts or inhibits anyone's use or enjoyment of the site, or to attempt to gain unauthorized access to any part of the site or its related systems.`,
          },
          {
            title: "Intellectual property",
            body: `All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Remington Enterprises LLC operating as Quanton Labs and is protected by applicable intellectual property laws. The Quanton OS framework, agent architecture, orchestration methodology, and related systems are proprietary to Remington Enterprises LLC. You may not reproduce, distribute, modify, or create derivative works from any content on this site without our prior written consent.`,
          },
          {
            title: "Assessment and inquiry submissions",
            body: `When you complete the AI Readiness Assessment or submit an inquiry through our website, you represent that the information you provide is accurate and complete to the best of your knowledge. Submission of an assessment or inquiry does not constitute a binding agreement between you and Quanton Labs. Any engagement with Quanton Labs as a client requires the execution of a formal Engagement Agreement.`,
          },
          {
            title: "No warranties",
            body: `This website is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. Quanton Labs does not warrant that the site will be uninterrupted, error-free, or free of viruses or other harmful components. We do not warrant the accuracy, completeness, or usefulness of any information on the site.`,
          },
          {
            title: "Limitation of liability",
            body: `To the fullest extent permitted by applicable law, Remington Enterprises LLC operating as Quanton Labs shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of this website or its content. Our total liability for any claim arising from your use of this website shall not exceed one hundred US dollars ($100).`,
          },
          {
            title: "Third-party links",
            body: `This website may contain links to third-party websites including but not limited to booking platforms, social media profiles, and partner services. These links are provided for convenience only. Quanton Labs has no control over the content or practices of third-party sites and assumes no responsibility for them. Accessing third-party sites through links on our website is at your own risk.`,
          },
          {
            title: "Privacy",
            body: `Your use of this website is also governed by our Privacy Policy, which is incorporated into these Terms of Use by reference. Please review our Privacy Policy to understand our practices regarding the collection and use of your information.`,
          },
          {
            title: "Governing law",
            body: `These Terms of Use and any disputes arising from your use of this website shall be governed by and construed in accordance with the laws of the State of South Carolina, United States, without regard to its conflict of law provisions. Any legal action arising from these terms shall be brought exclusively in the courts of South Carolina.`,
          },
          {
            title: "Changes to these terms",
            body: `We may update these Terms of Use from time to time. We will post the updated terms on this page with a revised effective date. Continued use of the website after any changes constitutes your acceptance of the updated terms. We encourage you to review these terms periodically.`,
          },
          {
            title: "Contact",
            body: `If you have questions about these Terms of Use, contact us at growth@quantonlabs.com or by phone at +1 929-298-2162. Remington Enterprises LLC operating as Quanton Labs, United States.`,
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
