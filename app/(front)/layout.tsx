import Footer from "@/components/Frontend/Footer";
import MegaMenu from "@/components/Frontend/MegaMenu";
import Navbar from "@/components/Frontend/Navbar";
import SiteHeader from "@/components/site-header";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <SiteHeader />
      {children}
      <Footer />
    </div>
  );
}
