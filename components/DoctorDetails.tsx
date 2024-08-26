"use client";
import React, { useState } from "react";

export default function DoctorDetails() {
  const [isActive, setIsActive] = useState("availability");
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsActive("details")}
          className={
            isActive === "details"
              ? "py-4 px-8 w-full bg-blue-600 text-white uppercase tracking-widest"
              : "py-4 px-8 bg-slate-100 w-full text-slate-800 border border-gray-200 uppercase tracking-widest"
          }
        >
          Detalles servicio
        </button>
        <button
          onClick={() => setIsActive("availability")}
          className={
            isActive === "availability"
              ? "py-4 px-8 w-full bg-blue-600 text-white uppercase tracking-widest"
              : "py-4 px-8 bg-slate-100 w-full text-slate-800 border border-gray-200 uppercase tracking-widest"
          }
        >
          Disponibilidad
        </button>
      </div>
      <div className="py-8 px-6">
        {isActive === "availability" ? (
          <div>Disponibilidad componente</div>
        ) : (
          <div>Detalles servicios componente</div>
        )}
      </div>
    </div>
  );
}
