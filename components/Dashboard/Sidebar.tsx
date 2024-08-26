import { BarChart, Folder, Grid2X2, Home, Plus, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import LogoutButton from "./LogoutButton";

export default async function Sidebar() {
  return (
    <div className="hidden xl:flex xl:w-64 xl:flex-col border-r border-gray-300">
      <div className="flex flex-col pt-5 overflow-y-auto">
        <div className="flex flex-col justify-between flex-1 h-full px-4">
          <div className="space-y-4">
            <div>
              <Button
                variant="outline"
                className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 hover:bg-blue-500 hover:text-slate-50"
              >
                <Plus className="w-5 h-5 mr-1" />
                Create Product
              </Button>
            </div>
            <div>
              <p className="px-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                Analytics
              </p>
              <nav className="flex-1 mt-4 space-y-1">
                <Link
                  href="/dashboard"
                  className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 rounded-lg hover:bg-gray-200 group"
                >
                  <Home className="flex-shrink-0 w-5 h-5 mr-4" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/categories"
                  title="categories"
                  className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 rounded-lg hover:bg-gray-200 group"
                >
                  <Grid2X2 className="flex-shrink-0 w-5 h-5 mr-4" />
                  Categories
                </Link>
                <Link
                  href="/dashboard/products"
                  className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 rounded-lg hover:bg-gray-200 group"
                >
                  <Folder className="flex-shrink-0 w-5 h-5 mr-4" />
                  Products
                </Link>
              </nav>
            </div>
          </div>

          <div className="pb-4 mt-12">
            <nav className="flex-1 space-y-1">
              <Link
                href="#"
                title=""
                className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 rounded-lg hover:bg-gray-200 group"
              >
                <Settings className="flex-shrink-0 w-5 h-5 mr-4" />
                Settings
              </Link>

              <LogoutButton />
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
