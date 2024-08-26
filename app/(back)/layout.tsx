import NavBar from "@/components/Dashboard/NavBar";
import Sidebar from "@/components/Dashboard/Sidebar";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <NavBar />
      <div className="flex">
        <Sidebar />
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
