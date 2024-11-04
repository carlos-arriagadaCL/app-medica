"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import BioDataForm from "./BioDataForm";
import ContactInfo from "./ContactInfo";
import ProfileInfoForm from "./ProfileInfoForm";
import EducationInfo from "./EducationInfo";
import AdditionalInfo from "./AdditionalInfo";
import HospitalInfo from "./HospitalInfo";
import { useOnBoardingContext } from "@/context/context";
import { Speciality } from "@prisma/client";
import { getDoctorProfileById } from "@/actions/onboarding";

export default function OnboardingSteps({
  id,
  specialties,
}: {
  id: string;
  specialties: Speciality[];
}) {
  const params = useSearchParams();
  const page = params.get("page") ?? "bio-data";
  const router = useRouter();
  const {
    trackingNumber,
    doctorProfileId,
    setDoctorProfileId,
    savedDBData,
    setSavedDBData,
  } = useOnBoardingContext();

  useEffect(() => {
    async function fetchDoctorProfile() {
      if (!doctorProfileId && id) {
        const res = await getDoctorProfileById();
        if (res.status === 200 && res.data) {
          setDoctorProfileId(res.data.id);
          setSavedDBData(res.data);
        } else {
          console.log("No se encontró un DoctorProfile para este usuario");
        }
      }
    }
    fetchDoctorProfile();
  }, [doctorProfileId, id, setDoctorProfileId, setSavedDBData]);

  const formId = doctorProfileId || savedDBData?.id || null;

  const steps = [
    {
      title: "Biografia",
      page: "bio-data",
      component: (
        <BioDataForm
          title="Bio Data"
          description="Por favor complete sus datos"
          page={page}
          nextPage="profile"
          formId={formId}
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
          formId={formId}
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
          formId={formId}
          userId={id}
        />
      ),
    },
    {
      title: "Educacion",
      page: "education",
      component: (
        <EducationInfo
          specialties={specialties}
          title="Información educativa"
          description="Por favor complete su información educativa"
          page={page}
          nextPage="hospital"
          formId={formId}
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
          formId={formId}
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
          formId={formId}
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
    <div className="grid grid-cols-12 mx-auto rounded-lg shadow-inner border border-slate-200 dark:border-slate-600 min-h-screen bg-slate-100 dark:bg-slate-950">
      <div className="col-span-full sm:col-span-3 divide-y-2 divide-gray-200 bg-slate-300 h-full dark:bg-slate-900">
        {steps.map((step, i) => (
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
        ))}
      </div>
      <div className="col-span-full sm:col-span-9 p-4">
        {(trackingNumber || savedDBData?.trackingNumber) && (
          <p className="border-b border-gray-200 dark:border-slate-600 text-teal-600 dark:text-teal-400 pb-2">
            Su número de seguimiento es:{" "}
            <span className="font-bold">
              {trackingNumber ? trackingNumber : savedDBData.trackingNumber}
            </span>{" "}
            <span className="text-xs text-muted-foreground">
              (Este es su número de seguimiento para su postulacion a
              Profesional de la Salud)
            </span>
          </p>
        )}
        {currentStep?.component}
      </div>
    </div>
  );
}
