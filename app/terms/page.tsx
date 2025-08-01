import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsOfService() {
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
            Terms of Service
          </h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700 mb-4">
              By accessing and using JS Promotional Web (&ldquo;the
              Platform&rdquo;), you accept and agree to be bound by the terms
              and provision of this agreement. If you do not agree to abide by
              the above, please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Description of Service
            </h2>
            <p className="text-gray-700 mb-4">
              JS Promotional Web provides a comprehensive platform for managing
              promotional activities, including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Store and brand management</li>
              <li>Promotional content creation and distribution</li>
              <li>Coupon and gift card management</li>
              <li>Special events coordination</li>
              <li>Analytics and reporting tools</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. User Accounts and Registration
            </h2>
            <p className="text-gray-700 mb-4">
              To access certain features of the Platform, you must register for
              an account. You agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your account information</li>
              <li>Keep your account credentials secure</li>
              <li>
                Accept responsibility for all activities under your account
              </li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Acceptable Use Policy
            </h2>
            <p className="text-gray-700 mb-4">
              You agree not to use the Platform to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon intellectual property rights</li>
              <li>Transmit harmful, offensive, or inappropriate content</li>
              <li>Attempt to gain unauthorized access to the Platform</li>
              <li>Interfere with the Platform&apos;s operation or security</li>
              <li>Use the Platform for spam or unsolicited communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Content and Intellectual Property
            </h2>
            <p className="text-gray-700 mb-4">
              You retain ownership of content you create and upload to the
              Platform. By using our services, you grant us a license to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Store and process your content for platform functionality</li>
              <li>
                Display your content as intended by your use of the Platform
              </li>
              <li>Use your content for platform improvement and analytics</li>
            </ul>
            <p className="text-gray-700">
              The Platform&apos;s software, design, and content are protected by
              intellectual property laws and remain our property.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Payment Terms
            </h2>
            <p className="text-gray-700 mb-4">
              Some features of the Platform may require payment. Payment terms
              include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>All fees are non-refundable unless otherwise stated</li>
              <li>Prices may change with 30 days notice</li>
              <li>Payment is due immediately upon subscription</li>
              <li>Failed payments may result in service suspension</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Privacy and Data Protection
            </h2>
            <p className="text-gray-700 mb-4">
              Your privacy is important to us. Our collection and use of
              personal information is governed by our Privacy Policy, which is
              incorporated into these Terms by reference.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Service Availability
            </h2>
            <p className="text-gray-700 mb-4">
              We strive to maintain high service availability but cannot
              guarantee uninterrupted access. The Platform may be temporarily
              unavailable due to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Scheduled maintenance</li>
              <li>Technical issues</li>
              <li>Force majeure events</li>
              <li>Security updates</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Limitation of Liability
            </h2>
            <p className="text-gray-700 mb-4">
              To the maximum extent permitted by law, JS Promotional Web shall
              not be liable for any indirect, incidental, special,
              consequential, or punitive damages, including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Loss of profits or revenue</li>
              <li>Loss of data or business opportunities</li>
              <li>Service interruptions</li>
              <li>Third-party actions or content</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. Termination
            </h2>
            <p className="text-gray-700 mb-4">
              Either party may terminate this agreement at any time. Upon
              termination:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Your access to the Platform will cease</li>
              <li>We may delete your account and data</li>
              <li>Outstanding payments remain due</li>
              <li>Certain provisions survive termination</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              11. Changes to Terms
            </h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify these Terms at any time. Changes
              will be effective immediately upon posting. Your continued use of
              the Platform constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              12. Governing Law
            </h2>
            <p className="text-gray-700 mb-4">
              These Terms are governed by and construed in accordance with the
              laws of [Your Jurisdiction]. Any disputes arising from these Terms
              will be resolved in the courts of [Your Jurisdiction].
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              13. Contact Information
            </h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms of Service, please
              contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> legal@jspromotionalweb.com
              </p>
              {/* <p className="text-gray-700 mb-2">
                <strong>Address:</strong> [Your Business Address]
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> [Your Contact Number]
              </p> */}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            These Terms of Service are effective as of{" "}
            {new Date().toLocaleDateString()} and will remain in effect except
            with respect to any changes in their provisions in the future.
          </p>
        </div>
      </div>
    </div>
  );
}
