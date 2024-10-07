"use client";
import Link from "next/link";
import React from "react";
import { Pencil, Trash } from "lucide-react";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Symptom } from "@prisma/client";
import { deleteSymptom } from "@/actions/symptom";

export default function SymptomCard({ symptom }: { symptom: Symptom }) {
  async function handleDelete(id: string) {
    await deleteSymptom(id);
    toast.success("Symptom deleted successfully");
  }
  return (
    <div className="border mb-2 border-gray-100 shadow-sm text-xs bg-white py-3 px-2 w-full rounded-md dark:text-slate-900 flex items-center gap-4 justify-between">
      <div className="flex items-center gap-3">
        <h2>{symptom.title}</h2>
      </div>
      <div className="flex">
        <Link
          className="text-blue-600"
          href={`/dashboard/symptoms/update/${symptom.slug}`}
        >
          <Pencil className="w- h-4" />
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="text-red-600">
              <Trash className="w- h-4" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-red-600">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                Symptom
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(symptom.id)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
