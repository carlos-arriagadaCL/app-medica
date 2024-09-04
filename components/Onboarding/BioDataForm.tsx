"use client";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { BioDataFormProps } from "@/types/types";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import { useRouter } from "next/navigation";
import { DatePickerInput } from "../FormInputs/DatePickerInput";
import RadioInput from "../FormInputs/RadioInput";
import toast from "react-hot-toast";

export type StepFormProps = {
  page: string;
  title: string;
  description: string;
};

export default function BioDataForm({
  page,
  title,
  description,
}: StepFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [dob, setDOB] = useState<Date>();
  const [expiry, setExpiry] = useState<Date>();
  const [profileImage, setProfileImage] = useState("");
  const genderOptions = [
    {
      label: "Hombre",
      value: "male",
    },
    {
      label: "Mujer",
      value: "female",
    },
  ];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BioDataFormProps>();
  const router = useRouter();
  async function onSubmit(data: BioDataFormProps) {
    if (!dob) {
      toast.error("Seleccione fecha de nacimiento");
      return;
    }
    if (!expiry) {
      toast.error("Seleccione fecha de expiracion licencia");
      return;
    }
    data.dob = dob;
    data.medicalLicenseExpiry = expiry;
    data.page = page;
    console.log(data);
    // setIsLoading(true);
  }
  return (
    <div className="w-full">
      <div className="text-center border-b border-gray-200 pb-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          {title}
        </h1>
        <p className="text-balance text-muted-foreground">{description}</p>
      </div>
      <form className=" py-4 px-4 mx-auto " onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-2">
          <TextInput
            label="Nombre"
            register={register}
            name="firstName"
            errors={errors}
            placeholder="ej.: Juan"
            className="col-span-full sm:col-span-1"
          />
          <TextInput
            label="Apellido"
            register={register}
            name="lastName"
            errors={errors}
            placeholder="ej.: Perez"
            className="col-span-full sm:col-span-1"
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
          <DatePickerInput
            date={dob}
            setDate={setDOB}
            className="col-span-full sm:col-span-1"
            title="Fecha de nacimiento"
          />
          <RadioInput
            title="Sexo"
            name="gender"
            radioOptions={genderOptions}
            register={register}
            errors={errors}
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
