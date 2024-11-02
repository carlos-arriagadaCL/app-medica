import { Stethoscope, Video } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { User } from "@prisma/client";
import { Doctor, DoctorProfileAvailability } from "@/types/types";
import { getFormattedDate } from "@/utils/getFormatedShortDate";
import generateSlug from "@/utils/generateSlug";
import { getDayName } from "@/utils/getDayName";

// interface DoctorProps extends DoctorProfile {

// }

export default function DoctorCard({
  isInPerson = false,
  doctor,
}: {
  isInPerson?: boolean;
  doctor: Doctor;
}) {
  
  const today: keyof DoctorProfileAvailability = getDayName();
  const times = doctor.doctorProfile?.availability?.[today] ?? null;
  const formattedDate = getFormattedDate();

  return (
    <>
      {times && times.length > 0 && (
        <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-slate-800 inline-flex flex-col py-8 px-6 rounded-md hover:border-gray-400 duration-300 transition-all">
          <Link href={`/doctors/${doctor.slug}`}>
            <h2 className="uppercase font-bold text-2xl tracking-widest">
              {doctor.name}
            </h2>
            {isInPerson && (
              <p className="py-3">Direccion del doctor Lorem ipsum dolor sit</p>
            )}
            <div className="flex items-center gap-4 py-4">
              <div className="relative">
                <Image
                  src={
                    doctor.doctorProfile?.profilePicture ?? "/doc-profile.webp"
                  }
                  width={243}
                  height={207}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                {!isInPerson && (
                  <p className="absolute bottom-0 right-2 bg-blue-200 w-10 h-10 flex items-center justify-center rounded-full text-blue-700">
                    <Video className="w-6 h-6" />
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="flex items-center">
                  <Stethoscope className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>Medicina general</span>
                </p>
                <p className="bg-green-200 dark:text-slate-900 py-3 px-6 uppercase">
                  Disponible hoy
                </p>
              </div>
            </div>
          </Link>
          <div className="pt-6 border-t border-gray-400 dark:border-gray-600">
            <h3 className="flex gap-4 justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                {formattedDate}
              </span>{" "}
              <span className="font-bold">
                ${doctor.doctorProfile?.hourlyWage}
              </span>
            </h3>
            <div className="py-3 grid grid-cols-3 gap-2">
              {times.slice(0, 5).map((item, i) => {
                return (
                  <Link
                    className="bg-blue-600 text-sm text-white p-2 text-center"
                    key={i}
                    href={`/doctors/${doctor.slug}`}
                  >
                    {item}
                  </Link>
                );
              })}
              <Link
                className="text-[0.7rem] text-center bg-blue-900 text-white py-2 px-3 truncate"
                href={`/doctors/${doctor.slug}`}
              >
                Más horas
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
