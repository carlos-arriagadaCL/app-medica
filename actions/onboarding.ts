"use server";

import WelcomeEmail from "@/components/Emails/welcome-email";
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

export async function createAvailability(data: any) {
  try {
    const newAvailability = await prismaClient.doctorProfile.create({
      data});

    return newAvailability;
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
export async function updateAvailabilityById(id: string | undefined, data: any) {
  if (id) {
    try {
      const updatedAva = await prismaClient.doctorProfile.update({
        where: {
          id,
        },
        data,
      });
      return {
        data: updatedAva,
        status: 201,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        status: 500,
        error: "Availability salio mal",
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
      if (!existingProfile) {
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

export async function completeProfile(id: string | undefined, data: any) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  if (id) {
    try {
      const existingProfile = await prismaClient.doctorProfile.findUnique({
        where: {
          id,
        },
      });
      if (!existingProfile) {
        return {
          data: null,
          status: 404,
          error: "No se encontró el perfil",
        };
      }
      // send a welcome email
      const firstName = existingProfile.firstName;
      const email = existingProfile.email as string;
      const previewText = "Bienvenid@ a App Medica ";
      const message =
        "Gracias por unirte a los Doctores de App Medica, estamos muy felices de tenerte a aca.";
      const sendMail = await resend.emails.send({
        from: "App Medica <no-reply@app-medica.lat>",
        to: email,
        subject: "Bienvenid@ a App Medica",
        react: WelcomeEmail({ firstName, previewText, message }),
      });
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

export async function getDoctorProfileById(userId: string | undefined) {
  if (userId) {
    try {
      const profile = await prismaClient.doctorProfile.findUnique({
        where: {
          userId,
        },
        include: {
          availability: true,
        }
      });
      return {
        data: profile,
        status: 200,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        status: 500,
        error: "Profile was not fetched",
      };
    }
  }
}
