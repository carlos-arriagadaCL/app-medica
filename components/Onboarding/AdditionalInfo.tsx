"use client";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { AdditionalFormProps } from "@/types/types";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { TextAreaInput } from "../FormInputs/TextAreaInput";
import MultipleFileUpload from "../FormInputs/MultipleFileUpload";
import { StepFormProps } from "./BioDataForm";
import { completeProfile, updateDoctorProfile } from "@/actions/onboarding";
import { useOnBoardingContext } from "@/context/context";

export default function AdditionalInfo({
  page,
  title,
  description,
  nextPage,
  formId,
  userId,
}: StepFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { additionalData, savedDBData, setAdditionalData } =
    useOnBoardingContext();
  const initialDocs =
    additionalData.additionalDocs || savedDBData.additionalDocs;
  const [additionalDocs, setAdditionalDocs] = useState<File[]>(initialDocs);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdditionalFormProps>({
    defaultValues: {
      educationHistory:
        additionalData.educationHistory || savedDBData.educationHistory,
      research: additionalData.research || savedDBData.research,
      accomplishments:
        additionalData.accomplishments || savedDBData.accomplishments,
      page: additionalData.page || savedDBData.page,
    },
  });
  const router = useRouter();
  async function onSubmit(data: AdditionalFormProps) {
    setIsLoading(true);
    data.page = page;
    data.additionalDocs = additionalDocs.map((doc: any) => doc.url);
    console.log(data);
    try {
      const res = await completeProfile(formId, data);
      setAdditionalData(data);
      if (res?.status === 201) {
        setIsLoading(false);

        toast.success("Profile Completed Successfully");

        router.push("/login");
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
      <div className="text-center border-b border-gray-200 dark:border-slate-600 pb-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          {title}
        </h1>
        <p className="text-balance text-muted-foreground">{description}</p>
      </div>
      <form className=" py-4 px-4 mx-auto " onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-2">
          <TextAreaInput
            label="Education History"
            register={register}
            name="educationHistory"
            errors={errors}
            placeholder="Enter your education history"
          />
          <TextAreaInput
            label="Published Works or Research"
            register={register}
            name="research"
            errors={errors}
            placeholder="Enter your published works or research"
          />
          <TextAreaInput
            label="Any Special Accomplishments or Awards"
            register={register}
            name="accomplishments"
            errors={errors}
            placeholder="Enter any special accomplishments or awards"
          />
          <MultipleFileUpload
            label="Any Additional Documents (CV, Medical Certifications, etc.) Upload"
            files={additionalDocs as any}
            setFiles={setAdditionalDocs}
            endpoint="additionalDocs"
          />
        </div>
        <div className="mt-8 flex justify-center items-center">
          <SubmitButton
            id="submit"
            title="Finalizar"
            isLoading={isLoading}
            loadingTitle="Guardando por favor espere..."
          />
        </div>
      </form>
    </div>
  );
}
