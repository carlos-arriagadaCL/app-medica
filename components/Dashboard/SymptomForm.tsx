"use client";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { X } from "lucide-react";
import generateSlug from "@/utils/generateSlug";
import toast from "react-hot-toast";
import {
  createManySymptoms,
  createSymptom,
  updateSymptomById,
} from "@/actions/symptom";
import { Symptom } from "@prisma/client";

export type SymptomProps = {
  title: string;
  slug: string;
};

export default function SymptomForm({
  title,
  initialData,
}: {
  title: string;
  initialData?: Symptom;
}) {
  const editingId = initialData?.id || "";
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SymptomProps>({
    defaultValues: {
      title: initialData?.title || "",
    },
  });
  const router = useRouter();
  async function onSubmit(data: SymptomProps) {
    setIsLoading(true);
    const slug = generateSlug(data.title);
    data.slug = slug;
    if (editingId) {
      await updateSymptomById(editingId, data);
      toast.success("Symptom updated successfully");
    } else {
      await createSymptom(data);
      toast.success("Symptom created successfully");
    }
    reset();
    router.push("/dashboard/symptoms");
  }
  async function handleCreateMany() {
    setIsLoading(true);
    try {
      await createManySymptoms();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full max-w-2xl shadow-sm rounded-md m-3 border border-gray-200 mx-auto">
      <div className="text-center border-b border-gray-200 py-4 dark:border-slate-600">
        <div className="flex items-center justify-between px-6">
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight">
            {title}
          </h1>
          {/* <Button type="button" onClick={handleCreateMany}>
            {isLoading ? "Creating..." : "Create Many Symptoms"}
          </Button> */}
          <Button asChild variant={"outline"}>
            <Link href="/dashboard/symptoms">
              <X className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
      <form className=" py-4 px-4 mx-auto " onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-2">
          <TextInput
            id="symptomTitle"
            label="Symptom Title"
            register={register}
            name="title"
            errors={errors}
            placeholder="Enter symptom title"
          />
        </div>
        <div className="mt-8 flex justify-between gap-4 items-center">
          <Button asChild variant={"outline"}>
            <Link href="/dashboard/symptom">Cancel</Link>
          </Button>
          <Button asChild variant={"outline"}>
            Create Many symptom
          </Button>
          <SubmitButton
            id={editingId ? "updateSymptom" : "createSymptom"}
            title={editingId ? "Update Symptom" : "Create Symptom"}
            isLoading={isLoading}
            loadingTitle={
              editingId ? "Updating please wait..." : "Saving please wait..."
            }
          />
        </div>
      </form>
    </div>
  );
}
