"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import BioDataForm from "./BioDataForm";
import ContactInfo from "./ContactInfo";
import ProfileInfoForm from "./ProfileInfoForm";
import EducationInfo from "./EducationInfo";
import AdditionalInfo from "./AdditionalInfo";
import Availability from "./Availability";
import HospitalInfo from "./HospitalInfo";
import { useOnBoardingContext } from "@/context/context";

export default function OnboardingSteps({ id }: { id: string }) {
  const params = useSearchParams();
  const page = params.get("page") ?? "bio-data";
  const { trackingNumber, doctorProfileId, savedDBData } =
    useOnBoardingContext();
  const steps = [
    {
      title: "Biografia",
      page: "bio-data",
      component: (
        <BioDataForm
          title="Bio Data"
          description="Please fill in your Bio Data Info"
          page={page}
          nextPage="profile"
          formId={doctorProfileId ? doctorProfileId : savedDBData.id}
          userId={id}
        />
      ),
    },
    {
      title: "Informacion de perfil",
      page: "profile",
      component: (
        <ProfileInfoForm
          title="Información de perfil"
          description="Por favor complete la información de su perfil"
          page={page}
          nextPage="contact"
          formId={doctorProfileId ? doctorProfileId : savedDBData.id}
          userId={id}
        />
      ),
    },
    {
      title: "Contacto",
      page: "contact",
      component: (
        <ContactInfo
          title="Información del contacto"
          description="Por favor complete su información de contacto"
          page={page}
          nextPage="education"
          formId={doctorProfileId ? doctorProfileId : savedDBData.id}
          userId={id}
        />
      ),
    },
    {
      title: "Educacion",
      page: "education",
      component: (
        <EducationInfo
          title="Información educativa"
          description="Por favor complete su información educativa"
          page={page}
          nextPage="hospital"
          formId={doctorProfileId ? doctorProfileId : savedDBData.id}
          userId={id}
        />
      ),
    },
    {
      title: "Hospital",
      page: "hospital",
      component: (
        <HospitalInfo
          title="Información hospitalaria"
          description="Por favor complete la información de su hospital"
          page={page}
          nextPage="additional"
          formId={doctorProfileId ? doctorProfileId : savedDBData.id}
          userId={id}
        />
      ),
    },
    {
      title: "Adicional",
      page: "additional",
      component: (
        <AdditionalInfo
          title="Información adicional"
          description="Por favor complete su información adicional"
          page={page}
          nextPage="final"
          formId={doctorProfileId ? doctorProfileId : savedDBData.id}
          userId={id}
        />
      ),
    },
    // {
    //   title: "Disponibilidad",
    //   page: "availability",
    //   component: (
    //     <Availability
    //       title="Availability Information"
    //       description="Please fill in your availability Info"
    //       page={page}
    //       nextPage=""
    //       formId={doctorProfileId}
    //       userId={id}
    //     />
    //   ),
    // },
  ];
  const currentStep = steps.find((step) => step.page === page);
  return (
    <div className="grid grid-cols-12 mx-auto rounded-lg shadow-inner overflow-hidden border border-slate-200 dark:border-slate-600 min-h-screen bg-slate-100 dark:bg-slate-950">
      <div className="col-span-full sm:col-span-3 divide-y-2 divide-gray-200 bg-slate-300 h-full dark:bg-slate-900">
        {steps.map((step, i) => {
          return (
            <Link
              key={i}
              href={`/onboarding/${id}?page=${step.page}`}
              className={cn(
                "block py-3 px-4 bg-slate-300 text-slate-800 shadow-inner uppercase text-sm",
                step.page === page ? " bg-teal-800 text-slate-100" : ""
              )}
            >
              {step.title}
            </Link>
          );
        })}
      </div>
      <div className="col-span-full sm:col-span-9 p-4">
        {trackingNumber ||
          (savedDBData.id && (
            <p className="border-b border-gray-200 dark:border-slate-600 text-teal-600 dark:text-teal-400 pb-2">
              Your tracking number is:{" "}
              <span className="font-bold">
                {trackingNumber ? trackingNumber : savedDBData.trackingNumber}
              </span>{" "}
              <span className="text-xs text-muted-foreground">
                (This is your tracking number for this onboarding process)
              </span>
            </p>
          ))}
        {currentStep?.component}
      </div>
    </div>
  );
}
