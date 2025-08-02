import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button
              variant="ghost"
              className="mb-6 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-700 mb-4">
              Easy Flyer (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
              &ldquo;us&rdquo;) is committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you use our promotional management
              platform.
            </p>
            <p className="text-gray-700">
              By using our platform, you agree to the collection and use of
              information in accordance with this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Information We Collect
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              2.1 Personal Information
            </h3>
            <p className="text-gray-700 mb-4">
              We may collect the following personal information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>
                Name and contact information (email address, phone number)
              </li>
              <li>
                Business information (company name, store details, brand
                information)
              </li>
              <li>Account credentials and profile information</li>
              <li>Payment and billing information</li>
              <li>Communication preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              2.2 Usage Information
            </h3>
            <p className="text-gray-700 mb-4">
              We automatically collect certain information when you use our
              platform:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>Features used and interactions with the platform</li>
              <li>Error logs and performance data</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              2.3 Promotional Content
            </h3>
            <p className="text-gray-700">
              We collect information about promotional activities, including
              flyers, coupons, special events, and related content that you
              create or manage through our platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Provide and maintain our promotional management platform</li>
              <li>Process transactions and manage billing</li>
              <li>Send administrative information and updates</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Improve our platform and develop new features</li>
              <li>Analyze usage patterns and optimize performance</li>
              <li>Ensure platform security and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Information Sharing and Disclosure
            </h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information in the following
              circumstances:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              4.1 Service Providers
            </h3>
            <p className="text-gray-700 mb-4">
              We may share information with trusted third-party service
              providers who assist us in operating our platform, such as:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Payment processors for billing purposes</li>
              <li>Cloud hosting providers for data storage</li>
              <li>Analytics services for platform improvement</li>
              <li>Customer support tools</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              4.2 Legal Requirements
            </h3>
            <p className="text-gray-700 mb-4">
              We may disclose your information if required by law or in response
              to valid legal requests, such as subpoenas or court orders.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              4.3 Business Transfers
            </h3>
            <p className="text-gray-700">
              In the event of a merger, acquisition, or sale of assets, your
              information may be transferred as part of the business
              transaction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Data Security
            </h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate technical and organizational security
              measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction. These measures
              include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Secure data centers and infrastructure</li>
              <li>Employee training on data protection</li>
            </ul>
            <p className="text-gray-700">
              However, no method of transmission over the internet or electronic
              storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Data Retention
            </h2>
            <p className="text-gray-700 mb-4">
              We retain your personal information for as long as necessary to
              provide our services and fulfill the purposes outlined in this
              Privacy Policy. The retention period depends on:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>The type of information collected</li>
              <li>The purpose for which it was collected</li>
              <li>Legal and regulatory requirements</li>
              <li>Your account status and preferences</li>
            </ul>
            <p className="text-gray-700">
              When we no longer need your information, we will securely delete
              or anonymize it.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Your Rights and Choices
            </h2>
            <p className="text-gray-700 mb-4">
              You have the following rights regarding your personal information:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              7.1 Access and Update
            </h3>
            <p className="text-gray-700 mb-4">
              You can access and update your personal information through your
              account settings or by contacting us.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              7.2 Deletion
            </h3>
            <p className="text-gray-700 mb-4">
              You can request deletion of your personal information, subject to
              certain legal and contractual obligations.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              7.3 Communication Preferences
            </h3>
            <p className="text-gray-700 mb-4">
              You can opt out of marketing communications and manage your
              communication preferences.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              7.4 Data Portability
            </h3>
            <p className="text-gray-700">
              You can request a copy of your personal information in a
              structured, machine-readable format.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar tracking technologies to enhance your
              experience on our platform. These technologies help us:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Remember your preferences and settings</li>
              <li>Analyze platform usage and performance</li>
              <li>Provide personalized content and features</li>
              <li>Ensure platform security</li>
            </ul>
            <p className="text-gray-700">
              You can control cookie settings through your browser preferences,
              though disabling certain cookies may affect platform
              functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. International Data Transfers
            </h2>
            <p className="text-gray-700 mb-4">
              Your information may be transferred to and processed in countries
              other than your own. We ensure that such transfers comply with
              applicable data protection laws and implement appropriate
              safeguards to protect your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. Children&apos;s Privacy
            </h2>
            <p className="text-gray-700">
              Our platform is not intended for children under the age of 13. We
              do not knowingly collect personal information from children under
              13. If you believe we have collected information from a child
              under 13, please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              11. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or applicable laws. We will notify you of
              any material changes by:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Posting the updated policy on our platform</li>
              <li>Sending you an email notification</li>
              <li>Displaying a notice on our platform</li>
            </ul>
            <p className="text-gray-700">
              Your continued use of our platform after such changes constitutes
              acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              12. Contact Us
            </h2>
            <p className="text-gray-700 mb-4">
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> info@easyfllyer.ca
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Website:</strong> www.easyfllyer.ca
              </p>
              <p className="text-gray-700">
                <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00
                PM EST
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              13. Governing Law
            </h2>
            <p className="text-gray-700">
              This Privacy Policy is governed by and construed in accordance
              with the laws of the Province of Ontario, Canada. Any disputes
              arising from this policy will be resolved in the courts of
              Ontario, Canada.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            This Privacy Policy is effective as of{" "}
            {new Date().toLocaleDateString()} and will remain in effect except
            with respect to any changes in its provisions in the future.
          </p>
        </div>
      </div>
    </div>
  );
}
