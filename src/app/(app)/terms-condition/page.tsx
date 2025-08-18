import React from "react";

const TermsAndConditionsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>
      <p className="mb-2 text-sm text-gray-500">
        Effective Date: June 23, 2025
      </p>

      <p className="mb-6">
        Welcome to <strong>Anonymous Message</strong>, an anonymous messaging
        platform that allows anyone to send messages to verified users without
        creating an account.
      </p>

      <p className="mb-6">
        By accessing or using Anonymous Message (“we”, “our”, or “the
        Platform”), you agree to be bound by these Terms and Conditions
        (“Terms”). These Terms govern your use of the platform, whether you are
        sending or receiving messages.
      </p>

      <Section title="1. Eligibility">
        <ul className="list-disc list-inside space-y-2">
          <li>
            Only <strong>verified users</strong> may receive anonymous messages
            through the platform.
          </li>
          <li>
            <strong>Senders are not required to register or log in</strong>, but
            must still comply with these Terms.
          </li>
          <li>
            Users under the age of 13 are not permitted to use the platform.
          </li>
        </ul>
      </Section>

      <Section title="2. Responsible Use">
        <p className="mb-2">By using Anonymous Message, you agree to:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Treat all users with <strong>respect, dignity, and fairness</strong>
            .
          </li>
          <li>
            Refrain from sending any messages that contain:
            <ul className="list-disc list-inside ml-6 space-y-1">
              <li>Harassment or bullying</li>
              <li>Hate speech or discriminatory content</li>
              <li>Threats, violence, or incitement</li>
              <li>Sexual content or obscenity</li>
              <li>Spam or self-promotion</li>
              <li>Any unlawful, harmful, or offensive content</li>
            </ul>
          </li>
          <li>Avoid impersonating any person or entity.</li>
          <li>
            Not exploit, scrape, or misuse the platform for unintended purposes.
          </li>
        </ul>
        <p className="mt-2">
          Violation of these terms may result in{" "}
          <strong>IP blocking, message removal</strong>, and reporting to
          appropriate authorities.
        </p>
      </Section>

      <Section title="3. Privacy and Anonymity">
        <ul className="list-disc list-inside space-y-2">
          <li>
            Anonymous Message does{" "}
            <strong>not collect personal information</strong> from senders
            unless explicitly provided.
          </li>
          <li>
            All messages are delivered anonymously unless the sender chooses to
            reveal their identity.
          </li>
          <li>
            We do not guarantee message delivery in the event of technical
            issues, moderation actions, or user suspension.
          </li>
        </ul>
      </Section>

      <Section title="4. Verified User Responsibilities">
        <ul className="list-disc list-inside space-y-2">
          <li>
            Verified users agree to receive anonymous messages from the public
            and understand the nature of such interactions.
          </li>
          <li>
            Users may <strong>block or report</strong> abusive messages, which
            will be reviewed by our moderation team.
          </li>
          <li>
            Verified status may be revoked at any time for violation of these
            Terms.
          </li>
        </ul>
      </Section>

      <Section title="5. Content Ownership and Moderation">
        <ul className="list-disc list-inside space-y-2">
          <li>
            You retain ownership of the content you submit, but grant Anonymous
            Message a{" "}
            <strong>non-exclusive, royalty-free, worldwide license</strong> to
            use, display, and moderate the content as needed.
          </li>
          <li>
            We reserve the right to{" "}
            <strong>remove or reject any content</strong> that violates our
            guidelines or terms without prior notice.
          </li>
        </ul>
      </Section>

      <Section title="6. Termination of Access">
        <p>
          We may suspend or permanently ban users (including anonymous senders
          via IP tracking) for:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Violating any part of these Terms</li>
          <li>Attempting to compromise platform integrity</li>
          <li>Abusing or harassing other users</li>
        </ul>
      </Section>

      <Section title="7. Limitation of Liability">
        <p>
          Anonymous Message is provided <strong>“as is”</strong> without
          warranties of any kind. We do not control or endorse the content of
          anonymous messages. We are <strong>not liable</strong> for any
          emotional, reputational, or psychological effects caused by use of the
          platform.
        </p>
      </Section>

      <Section title="8. Indemnification">
        <p>
          You agree to indemnify and hold harmless Anonymous Message, its
          operators, affiliates, and employees from any and all claims, damages,
          losses, or liabilities resulting from your use of the platform or
          violation of these Terms.
        </p>
      </Section>

      <Section title="9. Changes to Terms">
        <p>
          We may update these Terms from time to time. Continued use of the
          platform after any such changes constitutes your agreement to the
          revised Terms. The latest version will always be available at:
        </p>
        <a
          href="http://localhost:3000/terms-condition"
          className="text-blue-600 underline dark:text-blue-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          http://localhost:3000/terms-condition
        </a>
      </Section>

      <Section title="10. Contact Us">
        <p>
          If you have questions, feedback, or wish to report abuse, contact us:
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>
            Email:{" "}
            <a
              href="mailto:support@anonymousmessage.com"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              support@anonymousmessage.com
            </a>
          </li>
          <li>
            Website:{" "}
            <a
              href="#"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              https://localhost:3000/contact
            </a>
          </li>
        </ul>
      </Section>

      <p className="mt-10 font-medium">
        By using Anonymous Message, you confirm that you understand and agree to
        these Terms and Conditions.
      </p>
    </div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="mb-8">
    <h2 className="text-2xl font-semibold mb-3">{title}</h2>
    {children}
  </section>
);

export default TermsAndConditionsPage;
