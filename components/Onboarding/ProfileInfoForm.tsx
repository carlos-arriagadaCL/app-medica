"use client";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { ProfileFormProps } from "@/types/types";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import { useRouter } from "next/navigation";
import { DatePickerInput } from "../FormInputs/DatePickerInput";
import { TextAreaInput } from "../FormInputs/TextAreaInput";
import toast from "react-hot-toast";
import ImageInput from "../FormInputs/ImageInput";
import { StepFormProps } from "./BioDataForm";
import { useOnBoardingContext } from "@/context/context";
import { updateDoctorProfile } from "@/actions/onboarding";

export default function ProfileInfoForm({
  page,
  title,
  description,
  nextPage,
  formId,
  userId,
}: StepFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { profileData, savedDBData, setProfileData } = useOnBoardingContext();
  const initialExpiryDate =
    profileData.medicalLicenseExpiry || savedDBData.medicalLicenseExpiry;
  const initialProfileImage =
    profileData.profilePicture || savedDBData.profilePicture;
  const [expiry, setExpiry] = useState<Date>(initialExpiryDate);
  const [profileImage, setProfileImage] = useState(initialProfileImage);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormProps>({
    defaultValues: {
      bio: profileData.bio || savedDBData.bio,
      page: profileData.page || savedDBData.page,
      medicalLicense: profileData.medicalLicense || savedDBData.medicalLicense,
      medicalLicenseExpiry:
        profileData.medicalLicenseExpiry || savedDBData.medicalLicenseExpiry,
      yearsOfExperience:
        profileData.yearsOfExperience || savedDBData.yearsOfExperience,
    },
  });
  const router = useRouter();
  async function onSubmit(data: ProfileFormProps) {
    setIsLoading(true);
    if (!expiry) {
      toast.error(
        "Por favor ingrese la fecha de expiracion de la licencia medica"
      );
      setIsLoading(false);
      return;
    }
    data.medicalLicenseExpiry = expiry;
    data.page = page;
    data.yearsOfExperience = Number(data.yearsOfExperience);
    data.profilePicture = profileImage;
    console.log(data);
    try {
      const res = await updateDoctorProfile(formId, data);
      setProfileData(data);
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
      <div className="text-center border-b border-gray-200 pb-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          {title}
        </h1>
        <p className="text-balance text-muted-foreground">{description}</p>
      </div>
      <form className=" py-4 px-4 mx-auto " onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-2">
          <TextInput
            id="medicalLicense"
            label="Licencia medica"
            register={register}
            name="medicalLicense"
            errors={errors}
            placeholder="Ingrese licencia medica"
          />
          <TextInput
            id="yearsExperience"
            label="Años de experiencia"
            register={register}
            name="yearsExperience"
            type="number"
            errors={errors}
            placeholder="Ingrese años de experiencia"
            className="col-span-full sm:col-span-1"
          />
          <DatePickerInput
            date={expiry}
            setDate={setExpiry}
            className="col-span-full sm:col-span-1"
            title="Expiracion licencia medica"
          />
          <TextAreaInput
            label="Resumen profesional"
            register={register}
            name="bio"
            errors={errors}
            placeholder="Escriba un resumen profesional"
          />
          <ImageInput
            label="Imagen de perfil profesional"
            imageUrl={profileImage}
            setImageUrl={setProfileImage}
            endpoint="doctorProfileImage"
          />
        </div>
        <div className="mt-8 flex justify-center items-center">
          <SubmitButton
            id="profileInfoSubmitButton"
            title="Guardar y continuar"
            isLoading={isLoading}
            loadingTitle="Guardando por favor espere..."
          />
        </div>
      </form>
    </div>
  );
}
