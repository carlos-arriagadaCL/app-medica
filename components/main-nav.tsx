"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Microscope } from "lucide-react";
import { docsConfig } from "@/config/docs";

export function MainNav() {
  const pathname = usePathname();
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
        <Microscope className="h-6 w-6" />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        {docsConfig.mainNav?.map((item, i) => {
          return (
            <Link
              key={i}
              href="#"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === item.href
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              {item.title}
            </Link>
          );
        })}
        <Link
          href="/onboarding/resume"
          className={cn("transition-colors text-foreground/60 hover:text-foreground/80")}
        >
          Retomar Postulacion
        </Link>
      </nav>
    </div>
  );
}
