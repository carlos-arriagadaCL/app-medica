"use server";

import { SymptomProps } from "@/components/Dashboard/SymptomForm";
import { prismaClient } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createSymptom(data: SymptomProps) {
  try {
    const existingSymptom = await prismaClient.symptom.findUnique({
      where: {
        slug: data.slug,
      },
    });
    if (existingSymptom) {
      return {
        data: null,
        status: 409,
        error: "Symptom already exists",
      };
    }
    const newSymptom = await prismaClient.symptom.create({
      data,
    });
    revalidatePath("/dashboard/symptoms");
    return {
      data: newSymptom,
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
export async function updateSymptomById(id:string, data: SymptomProps) {
  try {
    const existingSymptom = await prismaClient.symptom.findUnique({
      where: {
        id,
      },
    });
    if (!existingSymptom) {
      return {
        data: null,
        status: 404,
        error: "Symptom not found",
      };
    }
    const updatedSymptom = await prismaClient.symptom.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/symptoms");
    return {
      data: updatedSymptom,
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
export async function createManySymptoms() {
  try {
    const symptoms = [
      {
        title: "Symptom 1",
        slug: "symptom-1",
      },
      {
        title: "Symptom 2",
        slug: "symptom-2",
      },
      {
        title: "Symptom 3",
        slug: "symptom-3",
      },
    ];

    for (const symptom of symptoms) {
      try {
        await createSymptom(symptom);
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
export async function getSymptoms() {
  try {
    const symptoms = await prismaClient.symptom.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return {
      data: symptoms,
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
export async function getSymptomBySlug(slug: string) {
  try {
    const symptom = await prismaClient.symptom.findUnique({
      where: {
        slug,
      },
    });
    return {
      data: symptom,
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
export async function deleteSymptom(id: string) {
  try {
    await prismaClient.symptom.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/symptoms");
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
