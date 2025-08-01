import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - JS Promotional Web",
  description: "Privacy Policy for JS Promotional Web platform",
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
