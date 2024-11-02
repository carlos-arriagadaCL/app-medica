import { getDoctorAppointments } from "@/actions/appointments";
import ListPanel from "@/components/Dashboard/Doctor/ListPanel";
import PanelHeader from "@/components/Dashboard/Doctor/PanelHeader";
import PatientPanel from "@/components/Dashboard/Doctor/PatientPanel";
import NotAuthorized from "@/components/NotAuthorized";
import { authOptions } from "@/lib/auth";
import { Calendar, Users } from "lucide-react";
import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";

export interface PatientProps {
  patientId: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  gender: string;
  occupation: string;
  dob: string;
}

export default async function PatientLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (user?.role !== "DOCTOR") {
    return <NotAuthorized />;
  }
  const appointments = (await getDoctorAppointments(user?.id)).data || [];

  const uniquePatientsMap = new Map();

  appointments.forEach((appointment) => {
    if (!uniquePatientsMap.has(appointment.patientId)) {
      uniquePatientsMap.set(appointment.patientId, {
        patientId: appointment.patientId,
        name: `${appointment.firstName} ${appointment.lastName}`,
        email: appointment.email,
        phone: appointment.phone,
        location: appointment.location,
        gender: appointment.gender,
        occupation: appointment.occupation,
        dob: appointment.dob,
      });
    }
  });
  const patients = Array.from(uniquePatientsMap.values()) as PatientProps[];
  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="col-span-4 py-3 border-r border-gray-100">
          <PanelHeader
            title="Patients"
            count={patients.length ?? 0}
            icon={Users}
          />
          <div className="px-3">
            <PatientPanel patients={patients} role={user?.role} />
          </div>
        </div>
        <div className="col-span-8">{children}</div>
      </div>
    </div>
  );
}
