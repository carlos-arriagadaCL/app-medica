import Dashboard from "@/components/Dashboard/Dashboard";
import DoctorDashboard from "@/components/Dashboard/DoctorDashboard";
import PatientDashboard from "@/components/Dashboard/PatientDashboard";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const role = user?.role;
  if (role === "DOCTOR") {
    return (
      <>
        <DoctorDashboard />
      </>
    );
  }
  if (role === "USER") {
    return (
      <>
        <PatientDashboard />
      </>
    );
  }
  return (
    <div>
      <p>{user?.role}</p>
      <Dashboard />
    </div>
  );
}
