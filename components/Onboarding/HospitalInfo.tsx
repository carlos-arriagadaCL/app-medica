"use client";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { BioDataFormProps, HospitalFormProps } from "@/types/types";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import { useRouter } from "next/navigation";
import { DatePickerInput } from "../FormInputs/DatePickerInput";
import RadioInput from "../FormInputs/RadioInput";
import toast from "react-hot-toast";
import ArrayItemsInput from "../FormInputs/ArrayInput";
import { ShadSelectInput } from "../FormInputs/ShadSelectInput";
import { StepFormProps } from "./BioDataForm";
import { updateDoctorProfile } from "@/actions/onboarding";
import { useOnBoardingContext } from "@/context/context";

export default function HospitalForm({
  page,
  title,
  description,
  nextPage,
  formId,
  userId,
}: StepFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { hospitalData, savedDBData, setHospitalData } = useOnBoardingContext();

  const insuranceOptions = [
    {
      label: "Yes",
      value: "yes",
    },
    {
      label: "No",
      value: "no",
    },
  ];
  const initialServices =
    hospitalData.servicesOffered.length > 0
      ? hospitalData.servicesOffered
      : savedDBData.servicesOffered;
  const initialLanguages =
    hospitalData.languagesSpoken || savedDBData.languagesSpoken;
  const initialInsuranceStatus =
    hospitalData.insuranceAccepted || savedDBData.insuranceAccepted;
  const [services, setServices] = useState(initialServices);
  const [languages, setLanguages] = useState(initialLanguages);
  const [insuranceAccepted, setInsuranceAccepted] = useState(
    initialInsuranceStatus
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HospitalFormProps>({
    defaultValues: {
      hospitalName: hospitalData.hospitalName || savedDBData.hospitalName,
      hospitalAddress:
        hospitalData.hospitalAddress || savedDBData.hospitalAddress,
      hospitalContactNumber:
        hospitalData.hospitalContactNumber || savedDBData.hospitalContactNumber,
      hospitalEmailAddress:
        hospitalData.hospitalEmailAddress || savedDBData.hospitalEmailAddress,
      hospitalWebsite:
        hospitalData.hospitalWebsite || savedDBData.hospitalWebsite,
      hospitalHoursOfOperation:
        hospitalData.hospitalHoursOfOperation ||
        savedDBData.hospitalHoursOfOperation,
      page: hospitalData.page || savedDBData.page,
    },
  });
  const router = useRouter();
  async function onSubmit(data: HospitalFormProps) {
    setIsLoading(true);
    data.page = page;
    data.insuranceAccepted = insuranceAccepted;
    data.hospitalHoursOfOperation = Number(data.hospitalHoursOfOperation);
    data.servicesOffered = services;
    console.log(data);
    try {
      const res = await updateDoctorProfile(formId, data);
      setHospitalData(data);
      if (res?.status === 201) {
        setIsLoading(false);
        toast.success("Hospital Info Updated Successfully");
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
      <div className="text-center border-b border-gray-200 pb-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          {title}
        </h1>
        <p className="text-balance text-muted-foreground">{description}</p>
      </div>
      <form className=" py-4 px-4 mx-auto " onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-2">
          <TextInput
            id="hospitalName"
            label="Hospital Name"
            register={register}
            name="hospitalName"
            errors={errors}
            placeholder="Enter hospital name"
            className="col-span-full sm:col-span-1"
          />
          <TextInput
            id="hospitalAddress"
            label="Hospital Address"
            register={register}
            name="hospitalAddress"
            errors={errors}
            placeholder="Enter hospital address"
            className="col-span-full sm:col-span-1"
          />
          <TextInput
            id="hospitalContactNumber"
            label="Hospital Contact Number"
            register={register}
            name="hospitalContactNumber"
            errors={errors}
            placeholder="Enter hospital contact number"
            className="col-span-full sm:col-span-1"
          />
          <TextInput
            id="hospitalEmailAddress"
            label="Hospital Email Address"
            register={register}
            name="hospitalEmailAddress"
            errors={errors}
            placeholder="Enter hospital email address"
            className="col-span-full sm:col-span-1"
          />
          <TextInput
            id="hospitalWebsite"
            label="Hospital Website (Optional)"
            register={register}
            name="hospitalWebsite"
            errors={errors}
            placeholder="Enter hospital website"
            className="col-span-full sm:col-span-1"
            isRequired={false}
          />
          <TextInput
            id="hospitalHoursOfOperation"
            label="Hospital Hours of Operation"
            register={register}
            name="hospitalHoursOfOperation"
            errors={errors}
            placeholder="Enter hospital hours of operation"
            className="col-span-full sm:col-span-1"
          />
          <ShadSelectInput
            label="Do you accept insurance?"
            optionTitle="Seleccione una opción"
            options={insuranceOptions}
            selectedOption={insuranceAccepted}
            setSelectedOption={setInsuranceAccepted}
          />
          <ArrayItemsInput
            setItems={setServices}
            items={services}
            itemTitle="Hospital Services"
          />
          <ArrayItemsInput
            setItems={setLanguages}
            items={languages}
            itemTitle="Languages Spoken at the Hospital"
          />
        </div>
        <div className="mt-8 flex justify-center items-center">
          <SubmitButton
            id="hospital-infoSubmitButton"
            title="Guardar y continuar"
            isLoading={isLoading}
            loadingTitle="Guardando por favor espere..."
          />
        </div>
      </form>
    </div>
  );
}
