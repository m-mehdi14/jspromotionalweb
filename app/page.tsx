import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Check,
  X,
  Smartphone,
  FileText,
  Upload,
  BarChart3,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/playstore.png"
              alt="Logo"
              width={120}
              height={40}
              className=" h-14 w-auto"
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
            {/* <Link
              href="#"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Pricing
            </Link> */}
            <Link
              href="#"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-100 to-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-green-700 mb-6">
            Create Stunning Digital Flyers
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Host and share your business flyers digitally. Upload, customize,
            and distribute professional marketing materials that reach more
            customers than traditional paper flyers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-medium">
              Get Started
            </Button>
            <Button
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-lg text-lg font-medium"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-600 mb-4">
              Digital Flyers vs Traditional Paper Flyers
            </h2>
            <p className="text-xl text-gray-600">
              See why businesses are switching to digital flyer hosting
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Digital Flyers */}
            <div className="bg-white border-2 border-green-100 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-600">
                  Digital Flyers
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Instant global distribution
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Zero printing costs</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Real-time analytics & tracking
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Easy updates & modifications
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Eco-friendly (no paper waste)
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Interactive elements & links
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">24/7 accessibility</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Social media integration
                  </span>
                </li>
              </ul>
            </div>

            {/* Paper Flyers */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gray-400 rounded-lg flex items-center justify-center mr-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700">
                  Paper Flyers
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <X className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Limited physical distribution
                  </span>
                </li>
                <li className="flex items-start">
                  <X className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    High printing & material costs
                  </span>
                </li>
                <li className="flex items-start">
                  <X className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">No performance tracking</span>
                </li>
                <li className="flex items-start">
                  <X className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Cannot update once printed
                  </span>
                </li>
                <li className="flex items-start">
                  <X className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Environmental impact</span>
                </li>
                <li className="flex items-start">
                  <X className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Static content only</span>
                </li>
                <li className="flex items-start">
                  <X className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Easy to lose or discard</span>
                </li>
                <li className="flex items-start">
                  <X className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Manual distribution required
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-600 mb-4">
              Why Choose Digital Flyer Pro?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to host and share professional marketing
              materials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-green-600 mb-4">
                Easy Upload & Host
              </h3>
              <p className="text-gray-600">
                Upload your flyers instantly and host them on our secure
                platform
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-green-600 mb-4">
                Mobile App Access
              </h3>
              <p className="text-gray-600">
                Download our mobile apps for Android and iOS devices
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-green-600 mb-4">
                Analytics & Insights
              </h3>
              <p className="text-gray-600">
                Track views, engagement, and performance of your digital flyers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of businesses already using Digital Flyer Pro
          </p>
          <Button className="bg-white text-green-600 hover:bg-gray-50 px-8 py-3 rounded-lg text-lg font-bold shadow-lg">
            Start Your Free Trial
          </Button>
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
