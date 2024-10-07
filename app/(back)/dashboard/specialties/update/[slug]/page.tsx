import { getSpecialtyBySlug } from "@/actions/specialities";
import SpecialtyForm from "@/components/Dashboard/SpecialtyForm";
import React from "react";

export default async function page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const specialty = (await getSpecialtyBySlug(slug))?.data;
  return (
    <div>
      {specialty && specialty.slug && (
        <SpecialtyForm title="Update Specialty" initialData={specialty} />
      )}
    </div>
  );
}
