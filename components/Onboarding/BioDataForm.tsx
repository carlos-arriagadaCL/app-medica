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
import { generateTrackingNumber } from "@/lib/generateTracking";
import { createDoctorProfile, updateDoctorProfile } from "@/actions/onboarding";
import { useOnBoardingContext } from "@/context/context";
import { Speciality } from "@prisma/client";

export type StepFormProps = {
  page: string;
  title: string;
  description: string;
  userId?: string;
  nextPage?: string;
  formId?: string;
  specialties?: Speciality[];
};

export default function BioDataForm({
  page,
  title,
  description,
  nextPage,
  formId,
  userId,
}: StepFormProps) {
  // GET CONTEXT DATA
  const {
    trackingNumber,
    setTrackingNumber,
    doctorProfileId,
    setDoctorProfileId,
    bioData,
    savedDBData,
    setBioData,
    setSavedDBData,
  } = useOnBoardingContext();

  const [isLoading, setIsLoading] = useState(false);
  const initialDOB = bioData.dob || savedDBData.dob;
  const [dob, setDOB] = useState<Date>(initialDOB);

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
  } = useForm<BioDataFormProps>({
    defaultValues: {
      firstName: bioData.firstName || savedDBData.firstName,
      lastName: bioData.lastName || savedDBData.lastName,
      rut: bioData.rut || savedDBData.rut,
      dob: bioData.dob || savedDBData.dob,
      gender: bioData.gender || savedDBData.gender,
      page: bioData.page || savedDBData.page,
      userId: bioData.userId || savedDBData.userId,
      trackingNumber: bioData.trackingNumber || savedDBData.trackingNumber,
    },
  });
  const router = useRouter();
  async function onSubmit(data: BioDataFormProps) {
    setIsLoading(true);
    if (!dob) {
      toast.error("Seleccione fecha de nacimiento");
      setIsLoading(false);
      return;
    }
    data.userId = userId as string;
    data.dob = dob;

    if (!trackingNumber) {
      const newTrackingNumber = generateTrackingNumber();
      data.trackingNumber = newTrackingNumber;
      setTrackingNumber(newTrackingNumber);
    } else {
      data.trackingNumber = trackingNumber;
    }

    data.page = page;
    try {
      if (formId) {
        // Actualizar DoctorProfile existente
        const res = await updateDoctorProfile(formId, data);
        if (res && res.status === 201) {
          setIsLoading(false);
          toast.success("Datos actualizados con éxito");
          setDoctorProfileId(res.data?.id ?? "");
          setSavedDBData(res.data);
          router.push(`/onboarding/${userId}?page=${nextPage}`);
        } else {
          setIsLoading(false);
          toast.error("Error al actualizar el perfil");
        }
      } else {
        // Crear nuevo DoctorProfile
        const res = await createDoctorProfile(data);
        if (res.status === 201) {
          setIsLoading(false);
          toast.success("Perfil creado con éxito");
          setDoctorProfileId(res.data?.id ?? "");
          setSavedDBData(res.data);
          router.push(`/onboarding/${userId}?page=${nextPage}`);
        } else if (res.status === 200 && res.data) {
          // Perfil ya existe
          setIsLoading(false);
          toast.success("Perfil existente encontrado");
          setDoctorProfileId(res.data?.id ?? "");
          setSavedDBData(res.data);
          router.push(`/onboarding/${userId}?page=${nextPage}`);
        } else {
          setIsLoading(false);
          toast.error("Error al crear el perfil");
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error("Ocurrió un error inesperado");
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
            id="firstName"
            label="Nombre"
            register={register}
            name="firstName"
            errors={errors}
            placeholder="ej.: Juan"
            className="col-span-full sm:col-span-1"
          />
          <TextInput
            id="lastName"
            label="Apellido"
            register={register}
            name="lastName"
            errors={errors}
            placeholder="ej.: Perez"
            className="col-span-full sm:col-span-1"
          />
          <TextInput
            id="rut"
            label="Rut"
            register={register}
            name="rut"
            errors={errors}
            placeholder="ej.: 12345678-9"
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
            id="bioDataSubmitButton"
            title="Guardar y continuar"
            isLoading={isLoading}
            loadingTitle="Guardando por favor espere..."
          />
        </div>
      </form>
    </div>
  );
}
