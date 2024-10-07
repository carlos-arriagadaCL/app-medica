"use server";

import { prismaClient } from "@/lib/db";

export async function getStats() {
  try {
    const serviceCount = await prismaClient.service.count();
    const doctorCount = await prismaClient.doctorProfile.count();
    const stats = {
      doctors: doctorCount.toString().padStart(2, "0"),
      patients: "00",
      appointments: "00",
      services: serviceCount.toString().padStart(2, "0"),
    };
    return stats;
  } catch (error) {
    return {
      doctors: null,
      patients: null,
      appointments: null,
      services: null,
    };
  }
}
