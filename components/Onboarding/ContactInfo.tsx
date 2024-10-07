"use client";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { ContactFormProps } from "@/types/types";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { StepFormProps } from "./BioDataForm";
import { updateDoctorProfile } from "@/actions/onboarding";
import { useOnBoardingContext } from "@/context/context";

export default function ContactInfo({
  page,
  title,
  description,
  nextPage,
  formId,
  userId,
}: StepFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { contactData, savedDBData, setContactData } = useOnBoardingContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormProps>({
    defaultValues: {
      email: contactData.email || savedDBData.email,
      phone: contactData.phone || savedDBData.phone,
      country: contactData.country || savedDBData.country,
      city: contactData.city || savedDBData.city,
      state: contactData.state || savedDBData.state,
      page: contactData.page || savedDBData.page,
    },
  });
  const router = useRouter();
  async function onSubmit(data: ContactFormProps) {
    setIsLoading(true);
    data.page = page;
    console.log(data);
    try {
      const res = await updateDoctorProfile(formId, data);
      setContactData(data);
      if (res?.status === 201) {
        setIsLoading(false);
        toast.success("Contact Info Updated Successfully");
        router.push(`/onboarding/${userId}?page=${nextPage}`);
      } else {
        setIsLoading(false);
        toast.error("Algo salio mal");
      }
    } catch (error) {
      setIsLoading(false);
    }
  }
  return (
    <div className="w-full">
      <div className="text-center border-b border-gray-200 pb-4 dark:border-slate-600">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          {title}
        </h1>
        <p className="text-balance text-muted-foreground">{description}</p>
      </div>
      <form className=" py-4 px-4 mx-auto " onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-2">
          <TextInput
            id="email"
            label="Correo electronico"
            register={register}
            name="email"
            type="email"
            errors={errors}
            placeholder="ej.: micorreo@mail.com"
            className="col-span-full"
          />
          <TextInput
            id="phone"
            label="Celular"
            register={register}
            name="phone"
            errors={errors}
            placeholder="+56 9 1234 5678"
            className="col-span-full sm:col-span-1"
          />
          <TextInput
            id="country"
            label="Pais"
            register={register}
            name="country"
            errors={errors}
            placeholder="Ingrese su pais"
            className="col-span-full sm:col-span-1"
          />
          <TextInput
            id="city"
            label="Ciudad"
            register={register}
            name="city"
            errors={errors}
            placeholder="Ingrese su ciudad"
            className="col-span-full sm:col-span-1"
          />
          <TextInput
            id="state"
            label="Comuna"
            register={register}
            name="state"
            errors={errors}
            placeholder="Ingrese su comuna"
            className="col-span-full sm:col-span-1"
          />
        </div>
        <div className="mt-8 flex justify-center items-center">
          <SubmitButton
            id="contactInfoSubmitButton"
            title="Guardar y continuar"
            isLoading={isLoading}
            loadingTitle="Guardando por favor espere..."
          />
        </div>
      </form>
    </div>
  );
}
