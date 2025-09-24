"use client";

import { Button } from "@/components/ui/button";
import { Check, X, Smartphone, Apple, Play } from "lucide-react";

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadAppModal({
  isOpen,
  onClose,
}: DownloadAppModalProps) {
  if (!isOpen) return null;

  const appFeatures = [
    {
      title: "Upload Flyers On-the-Go",
      description:
        "Take photos and upload flyers directly from your mobile device",
    },
    {
      title: "Real-time Analytics",
      description: "Monitor flyer performance and engagement metrics instantly",
    },
    {
      title: "Easy Sharing",
      description: "Share flyers across social media platforms with one tap",
    },
    {
      title: "Offline Access",
      description:
        "View and manage your flyers even without internet connection",
    },
    {
      title: "Push Notifications",
      description: "Get notified about flyer views, comments, and engagement",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Download Our Mobile Apps
              </h2>
              <p className="text-gray-600 mt-2">
                Access your digital flyers anywhere, anytime with our mobile
                applications
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-lg flex items-center space-x-4 transition-all duration-200 hover:scale-105"
              onClick={() =>
                window.open(
                  "https://apps.apple.com/app/digital-flyer-pro",
                  "_blank"
                )
              }
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <Apple className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-xs font-normal">Download on the</div>
                <div className="text-lg font-bold">App Store</div>
              </div>
            </button>

            <button
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-lg flex items-center space-x-4 transition-all duration-200 hover:scale-105"
              onClick={() =>
                window.open(
                  "https://play.google.com/store/apps/details?id=com.jspromotionalatestversion",
                  "_blank"
                )
              }
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <Play className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-xs font-normal">Get it on</div>
                <div className="text-lg font-bold">Google Play</div>
              </div>
            </button>
          </div>

          {/* App Preview and Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Mobile App Mockup */}
            <div className="flex justify-center lg:justify-center">
              <div className="relative">
                {/* Phone Frame */}
                <div className="w-64 h-[500px] bg-gray-800 rounded-[2.5rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden">
                    {/* App Header */}
                    <div className="bg-gray-50 px-4 py-3 border-b">
                      <h3 className="text-sm font-medium text-gray-600 text-center">
                        Digital Flyer Pro
                      </h3>
                    </div>

                    {/* App Content */}
                    <div className="p-4 space-y-4">
                      {/* Flyer Card 1 */}
                      <div className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg p-4 h-20 flex items-center justify-center">
                        <span className="text-white font-semibold">
                          Restaurant Special
                        </span>
                      </div>

                      {/* Flyer Card 2 */}
                      <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg p-4 h-20 flex items-center justify-center">
                        <span className="text-white font-semibold">
                          Sale Event
                        </span>
                      </div>

                      {/* Additional content */}
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* App Features */}
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                App Features
              </h3>
              <div className="space-y-4">
                {appFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Requirements */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              System Requirements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* iOS Requirements */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
                <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Apple className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  iOS Requirements
                </h4>
                <div className="space-y-2 text-gray-600">
                  <p>iOS 12.0 or later</p>
                  <p>iPhone, iPad, and iPod touch</p>
                  <p>50 MB available storage</p>
                  <p>Internet connection required</p>
                </div>
              </div>

              {/* Android Requirements */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Android Requirements
                </h4>
                <div className="space-y-2 text-gray-600">
                  <p>Android 6.0 (API level 23) or higher</p>
                  <p>All Android devices</p>
                  <p>45 MB available storage</p>
                  <p>Internet connection required</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-center space-x-4 mt-8 pt-6 border-t border-gray-200">
            <Button variant="outline" onClick={onClose} className="px-6 py-2">
              Close
            </Button>
            <Button
              onClick={() =>
                window.open(
                  "https://play.google.com/store/apps/details?id=com.jspromotionalatestversion",
                  "_blank"
                )
              }
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
            >
              Download Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
