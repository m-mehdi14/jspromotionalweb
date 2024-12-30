"use client";

import { usePathname } from "next/navigation";
import {
  Fullscreen,
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

  // Extract dynamic IDs from the pathname
  const segments = pathname.split("/");
  const brandId = segments[3]; // Extract the brand ID
  const storeId = segments[5]; // Extract the store ID if present
  // @ts-expect-error ignore
  let routes = [];

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin") {
      // Admin Dashboard Navigation
      routes = [
        { label: "Admin Dashboard", href: `/admin`, icon: Fullscreen },
        { label: "Users", href: `/admin/users`, icon: Users },
        { label: "Brands", href: `/admin/brand`, icon: Store },
        { label: "Stores", href: `/admin/stores`, icon: UserCircle },
        { label: "Flyers", href: `/admin/flyers`, icon: UserCircle },
        { label: "Coupon Gifts", href: `/admin/coupon-gifts`, icon: Gift },
        { label: "Special Events", href: `/admin/special-events`, icon: Store },
        { label: "Reports", href: `/admin/reports`, icon: Store },
        { label: "Admin Settings", href: `/admin/settings`, icon: Settings },
      ];
    } else if (
      [
        "/admin/users",
        "/admin/coupon-gifts",
        "/admin/flyers",
        "/admin/stores",
        "/admin/categories",
        "/admin/settings",
        "/admin/special-events",
        "/admin/reports",
      ].includes(pathname)
    ) {
      // Admin-Specific Routes
      routes = [
        { label: "Admin Dashboard", href: `/admin`, icon: Fullscreen },
        { label: "Users", href: `/admin/users`, icon: Users },
        { label: "Brands", href: `/admin/brand`, icon: Store },
        { label: "Stores", href: `/admin/stores`, icon: UserCircle },
        { label: "Flyers", href: `/admin/flyers`, icon: UserCircle },
        { label: "Coupon Gifts", href: `/admin/coupon-gifts`, icon: Gift },
        { label: "Categories", href: `/admin/categories`, icon: Store },
        { label: "Special Events", href: `/admin/special-events`, icon: Store },
        { label: "Reports", href: `/admin/reports`, icon: Store },
        { label: "Admin Settings", href: `/admin/settings`, icon: Settings },
      ];
    } else if (
      storeId &&
      pathname.includes(`/admin/brand/${brandId}/admin-store/${storeId}`)
    ) {
      // Store-Specific Navigation
      routes = [
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
          icon: Gift,
        },
        {
          label: "Back to Admin",
          href: `/admin/brand`,
          icon: Fullscreen,
        },
        // {
        //   label: "Store Settings",
        //   href: `/admin/brand/${brandId}/admin-store/${storeId}/settings`,
        //   icon: Settings,
        // },
      ];
    } else if (brandId) {
      // Brand-Specific Navigation
      routes = [
        {
          label: "Brand Dashboard",
          href: `/admin/brand/${brandId}`,
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
          icon: Gift,
        },
        {
          label: "Back to Admin",
          href: `/admin/brand`,
          icon: Fullscreen,
        },
        // {
        //   label: "Brand Settings",
        //   href: `/admin/brand/${brandId}/settings`,
        //   icon: Settings,
        // },
      ];
    } else if (["/admin/brand"].includes(pathname)) {
      routes = [
        {
          label: "Brand Dashboard",
          href: `/admin/brand`,
          icon: Fullscreen,
        },
        {
          label: "Admin Dashboard",
          href: `/admin`,
          icon: Fullscreen,
        },
      ];
    }
  }

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
      {
        // @ts-expect-error ignore
        routes.map((route) => (
          <NavItem
            key={route.href}
            label={route.label}
            icon={route.icon}
            href={route.href}
            isActive={pathname === route.href}
          />
        ))
      }
    </ul>
  );
};
