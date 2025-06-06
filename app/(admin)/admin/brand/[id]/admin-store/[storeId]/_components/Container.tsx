"use client";

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);

  const matches = useMediaQuery(`(max-width : 1024px)`);

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div
      className={cn(
        "flex-1 transition-all duration-300", // Smooth transition
        collapsed ? "ml-[70px]" : "ml-[240px]" // Adjust margin based on sidebar state
      )}
    >
      {children}
    </div>
  );
};
