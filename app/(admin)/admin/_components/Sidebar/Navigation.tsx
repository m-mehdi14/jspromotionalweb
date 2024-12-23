"use client";

// import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Fullscreen, Users, UserCircle } from "lucide-react";
import { NavItem, NavItemSkeleton } from "./nav-item";
import { useAuth } from "@/lib/AuthContext/authContext";

export const Navigation = () => {
  const pathname = usePathname();
  // const user = currentUser();
  const { user } = useAuth();

  // Extract the dynamic brand ID from the pathname
  const brandId = pathname.split("/")[3]; // Fallback to a default ID if not present

  const routes = [
    {
      label: "Home",
      href: `/`,
      icon: Fullscreen,
    },
    {
      label: "Brand Stores",
      href: `/admin/brand/${brandId}/admin-store`,
      icon: UserCircle,
    },
    {
      label: "Brand Flyers",
      href: `/admin/brand/${brandId}/admin-flyer`,
      icon: UserCircle,
    },
    {
      label: "Brand Special Events",
      href: `/admin/brand/${brandId}/admin-special-events`,
      icon: UserCircle,
    },
    {
      label: "Brand Coupon Gifts",
      href: `/admin/brand/${brandId}/admin-coupon-gift`,
      icon: UserCircle,
    },
    {
      label: "Setting",
      href: `/admin/setting`,
      icon: Users,
    },
  ];

  if (!user?.name) {
    return (
      <ul className=" space-y-2">
        {[...Array(4)].map((_, i) => (
          <NavItemSkeleton key={i} />
        ))}
      </ul>
    );
  }

  return (
    <ul className=" space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <NavItem
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  );
};
