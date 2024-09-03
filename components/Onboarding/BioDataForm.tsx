"use client";
import Link from "next/link";
import Image from "next/image";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { RegisterInputProps } from "@/types/types";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import { createUser } from "@/actions/users";
import { UserRole } from "@prisma/client";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function BioDataForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterInputProps>();
  const router = useRouter();

  async function onSubmit(data: RegisterInputProps) {
    setIsLoading(true);
  }
  return (
    <div className="w-full">
      <div className="text-center border-b border-gray-200 pb-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          Bio Data
        </h1>
        <p className="text-balance text-muted-foreground">
          Enter your information below to create an account
        </p>
      </div>
      <form className=" py-4 px-4 mx-auto " onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-2">
          <TextInput
            label="Nombre Completo"
            register={register}
            name="fullName"
            errors={errors}
            placeholder="ej.: Juan Perez"
          />
          <TextInput
            label="Correo electronico"
            register={register}
            name="email"
            type="email"
            errors={errors}
            placeholder="ej.: micorreo@mail.com"
            className="col-span-full sm:col-span-1"
          />
          <TextInput
            label="Celular"
            register={register}
            name="phone"
            type="tel"
            errors={errors}
            className="col-span-full sm:col-span-1"
          />
        </div>
        <div className="mt-8 flex justify-center items-center">
          <SubmitButton
            title="Guardar y continuar"
            isLoading={isLoading}
            loadingTitle="Guardando por favor espere..."
          />
        </div>
      </form>
    </div>
  );
}
