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
  const { trackingNumber, doctorProfileId } = useOnBoardingContext();
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
          formId={doctorProfileId}
          userId={id}
        />
      ),
    },
    {
      title: "Informacion de perfil",
      page: "profile",
      component: (
        <ProfileInfoForm
          title="Profile Information"
          description="Please fill in your profile Info"
          page={page}
          nextPage="contact"
          formId={doctorProfileId}
          userId={id}
        />
      ),
    },
    {
      title: "Contacto",
      page: "contact",
      component: (
        <ContactInfo
          title="Contact Information"
          description="Please fill in your contact Info"
          page={page}
          nextPage="education"
          formId={doctorProfileId}
          userId={id}
        />
      ),
    },
    {
      title: "Educacion",
      page: "education",
      component: (
        <EducationInfo
          title="Education Information"
          description="Please fill in your education Info"
          page={page}
          nextPage="hospital"
          formId={doctorProfileId}
          userId={id}
        />
      ),
    },
    {
      title: "Hospital",
      page: "hospital",
      component: (
        <HospitalInfo
          title="Hospital Information"
          description="Please fill in your hospital Info"
          page={page}
          nextPage="additional"
          formId={doctorProfileId}
          userId={id}
        />
      ),
    },
    {
      title: "Adicional",
      page: "additional",
      component: (
        <AdditionalInfo
          title="Additional Information"
          description="Please fill in your additional Info"
          page={page}
          nextPage="final"
          formId={doctorProfileId}
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
    <div className="grid grid-cols-12 mx-auto rounded-lg shadow-inner overflow-hidden border border-slate-200 min-h-screen bg-slate-100">
      <div className="col-span-full sm:col-span-3 divide-y-2 divide-gray-200 bg-slate-300 h-full">
        {steps.map((step, i) => {
          return (
            <Link
              key={i}
              href={`/onboarding/${id}?page=${step.page}`}
              className={cn(
                "block py-3 px-4 bg-slate-300 text-slate-800 shadow-inner uppercase text-sm",
                step.page === page ? " bg-teal-800 text-slate-100 " : ""
              )}
            >
              {step.title}
            </Link>
          );
        })}
      </div>
      <div className="col-span-full sm:col-span-9 p-4">
        {trackingNumber && (
          <p className="border-b border-gray-200 text-teal-600 pb-2">
            Your tracking number is:{" "}
            <span className="font-bold">{trackingNumber}</span>{" "}
            <span className="text-xs text-muted-foreground">
              (This is your tracking number for this onboarding process)
            </span>
          </p>
        )}
        {currentStep?.component}
      </div>
    </div>
  );
}
