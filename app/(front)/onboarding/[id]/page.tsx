import { getSpecialties } from "@/actions/specialities";
import OnboardingSteps from "@/components/Onboarding/OnboardingSteps";
import React from "react";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const specialties = (await getSpecialties()).data || [];
  return (
    <div className="bg-teal-700 dark:bg-slate-800">
      <div className="max-w-5xl mx-auto py-8 min-h-screen">
        <OnboardingSteps id={id} specialties={specialties} />
      </div>
    </div>
  );
}
