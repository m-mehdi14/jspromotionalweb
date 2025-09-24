"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useState } from "react";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  const pricingPlans = [
    {
      name: "Starter",
      description: "Perfect for small businesses just getting started",
      monthlyPrice: 19,
      yearlyPrice: 15,
      features: [
        "Up to 50 flyers per month",
        "Basic analytics dashboard",
        "Mobile app access",
        "Email support",
        "Social media sharing",
        "5GB storage",
      ],
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses with regular marketing needs",
      monthlyPrice: 49,
      yearlyPrice: 39,
      features: [
        "Up to 200 flyers per month",
        "Advanced analytics & insights",
        "Priority mobile app features",
        "Priority email & chat support",
        "Custom branding options",
        "25GB storage",
        "A/B testing tools",
      ],
    },
    {
      name: "Enterprise",
      description: "For large organizations with extensive marketing campaigns",
      monthlyPrice: 99,
      yearlyPrice: 79,
      features: [
        "Unlimited flyers",
        "Enterprise analytics suite",
        "White-label mobile app",
        "24/7 phone support",
        "Full brand customization",
        "Unlimited storage",
        "API access & integrations",
        "Dedicated account manager",
      ],
    },
  ];

  const comparisonFeatures = [
    {
      feature: "Monthly Flyers",
      starter: "50",
      professional: "200",
      enterprise: "Unlimited",
    },
    {
      feature: "Storage Space",
      starter: "5GB",
      professional: "25GB",
      enterprise: "Unlimited",
    },
    {
      feature: "Analytics Dashboard",
      starter: true,
      professional: true,
      enterprise: true,
    },
    {
      feature: "Custom Branding",
      starter: false,
      professional: true,
      enterprise: true,
    },
    {
      feature: "API Access",
      starter: false,
      professional: false,
      enterprise: true,
    },
  ];

  const faqs = [
    {
      question: "Can I change my plan anytime?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes, all plans come with a 14-day free trial. No credit card required to start.",
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee for all paid plans.",
    },
  ];

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/playstore.png"
              alt="Logo"
              width={120}
              height={40}
              className="h-14 w-auto"
            />
          </div>
          <nav className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Register Business
            </Link>
            <Link
              href="https://play.google.com/store/apps/details?id=com.jspromotionalatestversion"
              className="text-gray-700 hover:text-green-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download App
            </Link>
            <Link href="/pricing" className="text-green-600 font-medium">
              Pricing
            </Link>
            <Link
              href="#"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Pricing Header */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose the perfect plan for your business. All plans include
            unlimited flyer hosting and mobile app access.
          </p>

          {/* Pricing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span
              className={`text-lg font-medium ${
                !isYearly ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isYearly ? "bg-green-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-lg font-medium ${
                isYearly ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Yearly
            </span>
            {isYearly && (
              <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded-full">
                Save 20%
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.name}
                className={`bg-white rounded-xl p-8 shadow-lg border border-gray-100 flex flex-col relative ${
                  index === 1 ? "ring-2 ring-green-500" : ""
                }`}
              >
                {/* Popular Badge for Professional Plan */}
                {index === 1 && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-600 text-white text-sm font-medium px-4 py-1 rounded-full">
                      Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-gray-500">/month</span>
                    {isYearly && (
                      <div className="text-sm text-gray-500 mt-1">
                        Billed annually (${plan.yearlyPrice * 12}/year)
                      </div>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full py-3 rounded-lg font-medium ${
                    index === 1
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}
                >
                  {index === 1 ? "Get Started" : "Choose Plan"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Features
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Starter
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Professional
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisonFeatures.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {item.feature}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">
                        {typeof item.starter === "boolean" ? (
                          item.starter ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-400 mx-auto" />
                          )
                        ) : (
                          item.starter
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">
                        {typeof item.professional === "boolean" ? (
                          item.professional ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-400 mx-auto" />
                          )
                        ) : (
                          item.professional
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">
                        {typeof item.enterprise === "boolean" ? (
                          item.enterprise ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-400 mx-auto" />
                          )
                        ) : (
                          item.enterprise
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center space-x-6 text-sm">
            <Link
              href="/privacy-policy"
              className="text-gray-500 hover:text-green-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-400">|</span>
            <Link
              href="/terms"
              className="text-gray-500 hover:text-green-600 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
