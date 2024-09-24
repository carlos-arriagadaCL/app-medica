"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LoginInputProps } from "@/types/types";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import TextInput from "../FormInputs/TextInput";

export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image.";

export default function LoginFormWithBg() {
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginInputProps>();
  async function onSubmit(data: LoginInputProps) {
    try {
      setIsLoading(true);
      console.log("Attempting to sign in with credentials:", data);
      const loginData = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      console.log("SignIn response:", loginData);
      if (loginData?.error) {
        setIsLoading(false);
        toast.error("Sign-in error: Check your credentials");
        setShowNotification(true);
      } else {
        // Sign-in was successful
        setShowNotification(false);
        reset();
        setIsLoading(false);
        toast.success("Login Successful");
        router.push(`/onboarding/66d5aed253fd941b1fe8e0dc`);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Network Error:", error);
      toast.error("Its seems something is wrong with your Network");
    }
  }
  return (
    <div className="w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Iniciar sesión</h1>
            <p className="text-balance text-muted-foreground">
              Ingrese su correo electrónico a continuación para iniciar sesión
              en su cuenta
            </p>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            {showNotification && (
              <Alert color="failure" icon={HiInformationCircle}>
                <span className="font-medium">¡Error de inicio de sesión!</span>{" "}
                Por favor verifique sus credenciales
              </Alert>
            )}
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
              id="password"
              label="Contraseña"
              register={register}
              page="login"
              name="password"
              type="password"
              errors={errors}
              placeholder="********"
            />
            <SubmitButton
              id="loginSubmitButton"
              title="Iniciar sesion"
              isLoading={isLoading}
              loadingTitle="Iniciando sesion por favor espere..."
            />
            <Button variant="outline" className="w-full">
              Iniciar sesión con Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            ¿No tienes una cuenta?{" "}
            <Link id="signup-form" href="/register" className="underline">
              Registrate
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
