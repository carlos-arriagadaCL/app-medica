"use server";

import { prismaClient } from "@/lib/db";
import { Resend } from "resend";

export async function createDoctorProfile(formData: any) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const {
    dob,
    firstName,
    gender,
    lastName,
    rut,
    page,
    trackingNumber,
    userId,
  } = formData;
  try {
    const newProfile = await prismaClient.doctorProfile.create({
      data: {
        dob,
        firstName,
        gender,
        lastName,
        rut,
        page,
        trackingNumber,
        userId,
      },
    });

    return {
      data: newProfile,
      status: 201,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error: "Algo salio mal",
    };
  }
}

export async function updateDoctorProfile(id: string | undefined, data: any) {
  if (id) {
    try {
      const updatedProfile = await prismaClient.doctorProfile.update({
        where: {
          id,
        },
        data,
      });
      return {
        data: updatedProfile,
        status: 201,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        status: 500,
        error: "Algo salio mal",
      };
    }
  }
}

export async function getApplicationByTrack(trackingNumber: string) {
  if (trackingNumber) {
    try {
      const existingProfile = await prismaClient.doctorProfile.findUnique({
        where: {
          trackingNumber,
        },
      });
      if(!existingProfile){
        return {
          data: null,
          status: 404,
          error: "No se encontro la solicitud",
        };
      }
      return {
        data: existingProfile,
        status: 200,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        status: 500,
        error: "Algo salio mal",
      };
    }
  }
}

export async function getDoctorById(trackingNumber: string) {
  if (trackingNumber) {
    try {
      const existingProfile = await prismaClient.doctorProfile.findUnique({
        where: {
          trackingNumber,
        },
      });
      if(!existingProfile){
        return {
          data: null,
          status: 404,
          error: "No se encontro la solicitud",
        };
      }
      return {
        data: existingProfile,
        status: 200,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        status: 500,
        error: "Algo salio mal",
      };
    }
  }
}
