"use client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import {
  History,
  CalendarCheck,
  Check,
  CircleEllipsis,
  X,
  MapPin,
  Mail,
  User,
} from "lucide-react";
import { Appointment, UserRole } from "@prisma/client";
import { timeAgo } from "@/utils/timeAgo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PatientProps } from "@/app/(back)/dashboard/doctor/patients/layout";

export default function PatientPanel({
  patients,
  role,
}: {
  patients: PatientProps[];
  role: UserRole;
}) {
  const pathname = usePathname();
  return (
    <ScrollArea className="h-96 w-full">
      {patients.map((item) => (
        <Link
          key={item.patientId}
          href={`/dashboard/doctor/patients/view/${item.patientId}`}
          className={cn(
            "border mb-2 border-red-300 shadow-sm text-xs bg-white py-3 px-2 inline-block w-full rounded-md dark:text-slate-900",
            pathname === `/dashboard/doctor/patients/view/${item.patientId}` &&
              "border-green-700 border-2 bg-green-50"
          )}
        >
          <div className="flex justify-between items-center pb-2">
            <h2>{item.name}</h2>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{item.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 border-b">
            <div className="flex items-center font-semibold">
              <Mail className="w-4 h-4 mr-2" />
              <span>{item.email}</span>
            </div>
            <span className="font-semibold">{item.phone}</span>
          </div>
          <div className={cn("flex items-center pt-2 text-blue-600")}>
            <User className="mr-2 w-4 h-4" />
            <span>{item.gender}</span>
          </div>
        </Link>
      ))}
    </ScrollArea>
  );
}
