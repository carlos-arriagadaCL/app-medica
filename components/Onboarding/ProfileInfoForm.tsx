"use client";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { BioDataFormProps } from "@/types/types";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import { useRouter } from "next/navigation";
import { DatePickerInput } from "../FormInputs/DatePickerInput";
import { TextAreaInput } from "../FormInputs/TextAreaInput";
import toast from "react-hot-toast";
import ImageInput from "../FormInputs/ImageInput";
import { StepFormProps } from "./BioDataForm";

export default function ProfileInfoForm({
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
            label="Licencia medica"
            register={register}
            name="medicalLicense"
            errors={errors}
            placeholder="Ingrese licencia medica"
            className="col-span-full sm:col-span-1"
          />
          <DatePickerInput
            date={expiry}
            setDate={setExpiry}
            className="col-span-full sm:col-span-1"
            title="Expiracion licencia medica"
          />
          <TextAreaInput
            label="Biografia"
            register={register}
            name="bio"
            errors={errors}
            placeholder="Ingrese biografia"
          />
          <ImageInput
            label="Professional Profile Image"
            imageUrl={profileImage}
            setImageUrl={setProfileImage}
            endpoint="doctorProfileImage"
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
