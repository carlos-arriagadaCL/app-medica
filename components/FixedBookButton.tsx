"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function FixedBookButton() {
  return (
    <div className="fixed bottom-0 bg-white z-50 w-full shadow-2xl py-8 px-6 rounded-md  border border-gray-200 mx-auto">
      <div className="max-w-4xl mx-auto gap-4 flex items-center justify-between">
        <div className="w-full">
          <p className="text-xl font-bold">$precio</p>
          <p className="font-semibold text-sm">fecha de cita</p>
        </div>
        <Button
          variant="outline"
          className="inline-flex items-center justify-center w-full px-4 py-6 text-sm font-semibold uppercase tracking-widest leading-5 text-white transition-all duration-200 bg-slate-900 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600 hover:bg-slate-800 hover:text-slate-50"
        >
          <Plus className="w-5 h-5 mr-1" />
          Reservar
        </Button>
      </div>
    </div>
  );
}
