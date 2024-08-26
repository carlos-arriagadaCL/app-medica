import React from "react";
import Image from "next/image";
import DoctorDetails from "@/components/DoctorDetails";
import FixedBookButton from "@/components/FixedBookButton";

export default function page() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-white max-w-4xl border border-gray-200 mx-auto shadow-md rounded-md">
        <div className="py-8 px-6">
          <div className="flex items-center justify-between">
            <div className="">
              <div className="flex flex-col">
                <h2 className="uppercase font-bold text-2xl tracking-widest">
                  Nombre doctor
                </h2>
                <p className="text-gray-500 text-xs uppercase">Especialidad</p>
              </div>
              <div className="py-3">
                <p>Doctor en persona o telemedicina</p>
                <p>Ubicacion del doctor</p>
              </div>
            </div>
            <Image
              src="/doc-profile.webp"
              width={243}
              height={207}
              alt="Doctor"
              className="w-36 h-36 rounded-full object-cover"
            />
          </div>
        </div>
        <div className="">
          <DoctorDetails />
        </div>
      </div>
      <FixedBookButton />
    </div>
  );
}
