"use server";

import { SpecialtyProps } from "@/components/Dashboard/SpecialtyForm";
import { prismaClient } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createSpecialty(data: SpecialtyProps) {
  try {
    const existingSpecialty = await prismaClient.speciality.findUnique({
      where: {
        slug: data.slug,
      },
    });
    if (existingSpecialty) {
      return {
        data: null,
        status: 409,
        error: "Specialty already exists",
      };
    }
    const newSpecialty = await prismaClient.speciality.create({
      data,
    });
    revalidatePath("/dashboard/specialties");
    return {
      data: newSpecialty,
      status: 201,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      status: 500,
      error,
    };
  }
}
export async function updateSpecialty(id:string, data: SpecialtyProps) {
  try {
    const existingSpecialty = await prismaClient.speciality.findUnique({
      where: {
        id
      },
    });
    if (!existingSpecialty) {
      return {
        data: null,
        status: 404,
        error: "Specialty not found",
      };
    }
    const updatedSpecialty = await prismaClient.speciality.update({
      where: {
        id
      },
      data
    });
    revalidatePath("/dashboard/specialties");
    return {
      data: updatedSpecialty,
      status: 201,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      status: 500,
      error,
    };
  }
}
export async function createManySpecialties() {
  try {
    const specialties = [
      {
        title: "Specialty 1",
        slug: "specialty-1",
      },
      {
        title: "Specialty 2",
        slug: "specialty-2",
      },
      {
        title: "Specialty 3",
        slug: "specialty-3",
      },
    ]

    for (const specialty of specialties) {
      try {
        await createSpecialty(specialty);
      } catch (error) {
        console.error(error);
      }
    }
  } catch (error) {
    return {
      data: null,
      status: 500,
      error,
    };
  }
}
export async function getSpecialties() {
  try {
    const specialties = await prismaClient.speciality.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return {
      data: specialties,
      status: 200,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      status: 500,
      error,
    };
  }
}
export async function getSpecialtyBySlug(slug: string) {
  try {
    const specialty = await prismaClient.speciality.findUnique({
      where: {
        slug,
      },
    });
    return {
      data: specialty,
      status: 200,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      status: 500,
      error,
    };
  }
}
export async function deleteSpecialty(id: string) {
  try {
    await prismaClient.speciality.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/specialties");
    return {
      ok: true,
      status: 200,
      error: null,
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      error,
    };
  }
}