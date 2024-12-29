"use client";

import { usePathname } from "next/navigation";
import {
  //Fullscreen,
  Users,
  UserCircle,
  Store,
  Gift,
  Settings,
} from "lucide-react";
import { NavItem, NavItemSkeleton } from "./nav-item";
import { useAuth } from "@/lib/AuthContext/authContext";

export const Navigation = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  // Extract the dynamic IDs from the pathname
  const segments = pathname.split("/");
  const brandId = segments[2]; // Extract the brand ID
  const storeId = segments[5]; // Extract the store ID if present

  // Define routes conditionally based on the path
  const routes =
    storeId &&
      pathname.includes(`/admin/brand/${brandId}/admin-store/${storeId}`)
      ? [
        {
          label: "Store Dashboard",
          href: `/admin/brand/${brandId}/admin-store/${storeId}`,
          icon: Store,
        },
        {
          label: "Store Flyers",
          href: `/admin/brand/${brandId}/admin-store/${storeId}/flyers`,
          icon: UserCircle,
        },
        {
          label: "Store Special Events",
          href: `/admin/brand/${brandId}/admin-store/${storeId}/special-events`,
          icon: Users,
        },
        {
          label: "Store Coupon Events",
          href: `/admin/brand/${brandId}/admin-store/${storeId}/coupon-gifts`,
          icon: Users,
        },
        {
          label: "Store Settings",
          href: `/admin/brand/${brandId}/admin-store/${storeId}/settings`,
          icon: Settings,
        },
      ]
      : [
        {
          label: "Brand Dashboard",
          href: `/brand/${brandId}`,
          icon: Store,
        },
        {
          label: "Brand Stores",
          href: `/brand/${brandId}/stores`,
          icon: UserCircle,
        },
        {
          label: "Brand Flyers",
          href: `/brand/${brandId}/flyers`,
          icon: UserCircle,
        },
        {
          label: "Brand Special Events",
          href: `/brand/${brandId}/special-events`,
          icon: UserCircle,
        },
        {
          label: "Brand Coupon Gifts",
          href: `/brand/${brandId}/coupon-gifts`,
          icon: Gift,
        },
        {
          label: "Settings",
          href: `/brand/${brandId}/settings`,
          icon: Users,
        },
      ];

  // Show skeletons while user data is loading
  if (!user?.name) {
    return (
      <ul className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <NavItemSkeleton key={i} />
        ))}
      </ul>
    );
  }

  // Render the navigation items
  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
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
