"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import BioDataForm from "./BioDataForm";
import ContactInfo from "./ContactInfo";
import ProfessionInfo from "./ProfessionInfo";

export default function OnboardingSteps({ id }: { id: string }) {
  const params = useSearchParams();
  const page = params.get("page") ?? 5;
  const steps = [
    {
      title: "Biografia",
      page: "bio-data",
      component: <BioDataForm />,
    },
    {
      title: "Contacto",
      page: "contact",
      component: <ContactInfo />,
    },
    {
      title: "Profession",
      page: "profession",
      component: <ProfessionInfo />,
    },
    {
      title: "Educacion",
      page: "education",
      component: <></>,
    },
    {
      title: "Adicional",
      page: "additional",
      component: <></>,
    },
    {
      title: "Disponibilidad",
      page: "availability",
      component: <></>,
    },
  ];
  const currentStep = steps.find((step) => step.page === page);
  return (
    <div className="grid grid-cols-12 mx-auto rounded-lg shadow-inner overflow-hidden border border-slate-200 min-h-screen bg-slate-100">
      <div className="col-span-full sm:col-span-3 divide-y-2 divide-gray-200">
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
        {currentStep?.component}
      </div>
    </div>
  );
}
