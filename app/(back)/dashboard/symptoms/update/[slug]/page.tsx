import { getSymptomBySlug } from "@/actions/symptom";
import SymptomForm from "@/components/Dashboard/SymptomForm";
import React from "react";

export default async function page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const symptom = (await getSymptomBySlug(slug))?.data;
  return (
    <div>
      {symptom && symptom.slug && (
        <SymptomForm title="Update Symptom" initialData={symptom} />
      )}
    </div>
  );
}
