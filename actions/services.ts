"use server";

import { prismaClient } from "@/lib/db";
import { ServiceProps } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createService(data: ServiceProps) {
  try {
    const existingService = await prismaClient.service.findUnique({
      where: {
        slug: data.slug,
      },
    });
    if (existingService) {
      return {
        data: null,
        status: 409,
        error: "Service already exists",
      };
    }
    const newService = await prismaClient.service.create({
      data,
    });
    revalidatePath("/dashboard/services");
    return {
      data: newService,
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
export async function updateService(id: string, data: ServiceProps) {
  try {
    const existingService = await prismaClient.service.findUnique({
      where: {
        id,
      },
    });
    if (!existingService) {
      return {
        data: null,
        status: 404,
        error: "Service not found",
      };
    }
    const updatedService = await prismaClient.service.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/services");
    return {
      data: updatedService,
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
export async function createManyServices() {
  try {
    const services = [
      {
        title: "Service 1",
        imageUrl: "https://via.placeholder.com/512",
        slug: "service-1",
      },
      {
        title: "Service 2",
        imageUrl: "https://via.placeholder.com/512",
        slug: "service-2",
      },
      {
        title: "Service 3",
        imageUrl: "https://via.placeholder.com/512",
        slug: "service-3",
      },
    ];

    for (const service of services) {
      try {
        await createService(service);
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
export async function getServices() {
  try {
    const services = await prismaClient.service.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return {
      data: services,
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
export async function getServiceBySlug(slug: string) {
  try {
    const service = await prismaClient.service.findUnique({
      where: {
        slug,
      },
    });
    return {
      data: service,
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
export async function deleteService(id: string) {
  try {
    await prismaClient.service.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/services");
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
