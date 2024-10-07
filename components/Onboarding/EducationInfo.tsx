"use client";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { EducationFormProps } from "@/types/types";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { StepFormProps } from "./BioDataForm";
import SelectInput from "../FormInputs/SelectInput";
import ArrayItemsInput from "../FormInputs/ArrayInput";
import MultipleFileUpload, { File } from "../FormInputs/MultipleFileUpload";
import { updateDoctorProfile } from "@/actions/onboarding";
import { useOnBoardingContext } from "@/context/context";

export default function EducationInfo({
  page,
  title,
  description,
  nextPage,
  formId,
  userId,
}: StepFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { educationData, savedDBData, setEducationData } =
    useOnBoardingContext();

  const specializationOptions = [
    {
      label: "Medicina General",
      value: "medicine",
    },
    {
      label: "Salud mental",
      value: "mentalHealth",
    },
  ];
  const initialSpecialization =
    educationData.otherSpecializations.length > 0
      ? educationData.otherSpecializations
      : savedDBData.otherSpecializations;
  const [otherSpecializations, setOtherSpecializations] = useState(
    initialSpecialization
  );
  const initialDocs =
    educationData.boardCertifications || savedDBData.boardCertifications;
  const [docs, setDocs] = useState<File[]>(initialDocs);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EducationFormProps>({
    defaultValues: {
      medicalSchool: educationData.medicalSchool || savedDBData.medicalSchool,
      graduationYear:
        educationData.graduationYear || savedDBData.graduationYear,
      primarySpecialization:
        educationData.primarySpecialization ||
        savedDBData.primarySpecialization,
      page: educationData.page || savedDBData.page,
    },
  });
  const router = useRouter();
  async function onSubmit(data: EducationFormProps) {
    setIsLoading(true);
    data.page = page;
    data.otherSpecializations = otherSpecializations;
    data.boardCertifications = docs.map((doc) => doc.url);

    try {
      const res = await updateDoctorProfile(formId, data);
      setEducationData(data);
      if (res?.status === 201) {
        setIsLoading(false);
        toast.success("Education Info Updated Successfully");
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
            id="medicalSchool"
            label="Universidad"
            register={register}
            name="medicalSchool"
            errors={errors}
            placeholder="Ingrese su casa de estudio"
            className="col-span-full"
          />
          <TextInput
            id="graduationYear"
            label="Año de graduacion"
            register={register}
            type="number"
            name="graduationYear"
            errors={errors}
            placeholder="Ingrese año de graduacion"
            className="col-span-full sm:col-span-1"
          />
          <SelectInput
            label="Seleccione sus principales especializaciones"
            register={register}
            name="specialization"
            className="col-span-full sm:col-span-1"
            options={specializationOptions}
          />
          <ArrayItemsInput
            setItems={setOtherSpecializations}
            items={otherSpecializations}
            itemTitle="Otras especialidades"
          />
          <MultipleFileUpload
            label="Sube tus Documentos Académicos (Máximo de 4 documentos)"
            files={docs}
            setFiles={setDocs}
            endpoint="doctorProfessionDocs"
          />
        </div>
        <div className="mt-8 flex justify-center items-center">
          <SubmitButton
            id="educationInfoSubmitButton"
            title="Guardar y continuar"
            isLoading={isLoading}
            loadingTitle="Guardando por favor espere..."
          />
        </div>
      </form>
    </div>
  );
}
