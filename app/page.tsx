import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Store, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            JS Promotional Web
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your comprehensive platform for managing promotional activities,
            brands, and stores. Streamline your marketing efforts with our
            powerful tools and analytics.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Store className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Store Management
            </h3>
            <p className="text-gray-600">
              Efficiently manage multiple stores and their promotional
              activities
            </p>
          </div>

          <div className="text-center p-8 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Users className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Brand Control
            </h3>
            <p className="text-gray-600">
              Take control of your brand presence across all locations
            </p>
          </div>

          <div className="text-center p-8 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <BarChart3 className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Analytics & Reports
            </h3>
            <p className="text-gray-600">
              Get detailed insights and reports on your promotional performance
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-8">
            Get started by accessing your personalized dashboard
          </p>
          <Link href="/dashboard">
            <Button className="bg-gray-900 hover:bg-gray-800 text-white text-lg px-8 py-3 rounded-lg transition-colors duration-200 group">
              <span className="mr-2">Go to Dashboard</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
            <div className="text-gray-600">Active Stores</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
            <div className="text-gray-600">Brands</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
            <div className="text-gray-600">Promotions</div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-gray-200 text-center">
          <div className="flex justify-center space-x-6 text-sm">
            <Link
              href="/privacy-policy"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-400">|</span>
            <Link
              href="/terms"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
