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

export default function RegisterWithBg({
  role = "USER",
  plan = "",
}: {
  role?: string | string[] | undefined;
  plan?: string | string[] | undefined;
}) {
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
    data.role = role;
    data.plan = plan;
    try {
      const user = await createUser(data);
      if (user && user.status === 200) {
        console.log("Usuario creado correctamente");
        reset();
        setIsLoading(false);
        toast.success("Usuario creado correctamente");
        router.push(`/verify-account/${user.data?.id}`);
        console.log(user.data);
      } else {
        console.log(user.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Hubo un problema al crear la cuenta");
      setIsLoading(false);
    }
  }
  return (
    <div className="w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Registrarse</h1>
            <p className="text-balance text-muted-foreground">
              Ingrese su información a continuación para crear una cuenta
            </p>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              id="fullName"
              label="Nombre Completo"
              register={register}
              name="fullName"
              errors={errors}
              placeholder="ej.: Juan Perez"
            />
            <TextInput
              id="email"
              label="Correo electronico"
              register={register}
              name="email"
              type="email"
              errors={errors}
              placeholder="ej.: micorreo@mail.com"
            />
            <TextInput
              id="phone"
              label="Celular"
              register={register}
              name="phone"
              type="tel"
              errors={errors}
              placeholder="ej.: +56 9 1234 5678"
            />
            <TextInput
              id="password"
              label="Contraseña"
              register={register}
              name="password"
              type="password"
              errors={errors}
              placeholder="********"
            />
            <SubmitButton
              id="registerSubmitButton"
              title="Registrarse"
              isLoading={isLoading}
              loadingTitle="Creando cuenta por favor espere..."
            />
            <Button variant="outline" className="w-full">
              Regístrate con Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link id="login-form" href="/login" className="underline">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/login-bg.webp"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
