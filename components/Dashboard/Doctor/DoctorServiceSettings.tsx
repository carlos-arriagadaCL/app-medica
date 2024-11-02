import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import UpdateServiceForm from "./UpdateServiceForm";
import { getServices } from "@/actions/services";
import { getSpecialties } from "@/actions/specialities";
import { getSymptoms } from "@/actions/symptom";
import { SelectOption } from "@/components/FormInputs/ShadSelectInput";
import { DoctorProfile } from "@prisma/client";

export default async function DoctorServiceSettings({
  profile,
}: {
  profile: DoctorProfile | undefined | null; 
}) {
  const services = (await getServices()).data;
  const specialties = (await getSpecialties()).data;
  const symptoms = (await getSymptoms()).data;

  return (
    <div className="grid gap-6">
      <Card x-chunk="dashboard-04-chunk-1">
        {/* <CardHeader>
          <CardTitle>Choose Service</CardTitle>
          <CardDescription>
            Used to identify your store in the marketplace.
          </CardDescription>
        </CardHeader> */}
        <UpdateServiceForm
          profile={profile}
          services={services}
          specialties={specialties}
          symptoms={symptoms}
        />
      </Card>
    </div>
  );
}
