"use client";
import Link from "next/link";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { RegisterInputProps } from "@/types/types";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import { createUser } from "@/actions/users";
import { UserRole } from "@prisma/client";
import toast from "react-hot-toast";

export default function RegisterForm({ role = "USER" }: { role?: UserRole }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterInputProps>();

  async function onSubmit(data: RegisterInputProps) {
    setIsLoading(true);

    data.role = role;
    try {
      const user = await createUser(data);
      if (user && user.status === 200) {
        console.log("Usuario creado correctamente");
        reset();
        setIsLoading(false);
        toast.success("Usuario creado correctamente")
        console.log(user.data);
      } else {
        console.log(user.error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Crear una nueva cuenta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextInput
            label="Nombre Completo"
            register={register}
            name="fullName"
            errors={errors}
          />
          <TextInput
            label="Correo electronico"
            register={register}
            name="email"
            type="email"
            errors={errors}
          />
          <TextInput
            label="Celular"
            register={register}
            name="phone"
            type="tel"
            errors={errors}
          />
          <TextInput
            label="Contraseña"
            register={register}
            name="password"
            type="password"
            errors={errors}
          />

          <div>
            <SubmitButton
              title="Crear Cuenta"
              isLoading={isLoading}
              loadingTitle="Creando por favor espere..."
            />
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Ya tienes una cuenta?{" "}
          <Link
            href="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Inicia sesion
          </Link>
        </p>
      </div>
    </div>
  );
}
