"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SubmitButton from "../FormInputs/SubmitButton";
import { Input } from "../ui/input";
import { getApplicationByTrack } from "@/actions/onboarding";
import { useOnBoardingContext } from "@/context/context";

const FormSchema = z.object({
  trackingNumber: z.string().min(2, {
    message: "TrackingNumber must be at least 10 characters.",
  }),
});

export default function TrackingForm() {
  const { setSavedDBData } = useOnBoardingContext();
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      trackingNumber: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      const res = await getApplicationByTrack(data.trackingNumber);
      // SAVE THIS TO THE CONTEXT API
      setSavedDBData(res?.data);
      if (res?.status === 404) {
        setShowNotification(true);
        setLoading(false);
      }
      if (res?.status === 200) {
        toast.success("Redirecting to your application");
        // setUserId(res.data?.userId!);
        // setPage(res.data?.page!);
        // setTrackingSuccessful(true);
        setLoading(false);
        router.push(`/onboarding/${res.data?.userId}?page=${res.data?.page}`);
      } else {
        throw new Error("Something went wrong");
      }
      // OnBoarding Page
    } catch (error) {
      toast.error("Something went wrong, Try Again");
      setLoading(false);
      console.log(error);
    }
    console.log(data);
  }

  return (
    <Form {...form}>
      {showNotification && (
        <Alert color="failure" icon={HiInformationCircle}>
          <span className="font-medium">Wrong Tracking Number!</span> Por favor
          verifique el tracking number y vuelva a ingresar
        </Alert>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="trackingNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tracking Number</FormLabel>
              <FormControl>
                <Input placeholder="ej.: ABCD1234EF" {...field} />
              </FormControl>
              <FormDescription>
                {/* This is your public display name. */}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton
          id="submit"
          title="Submit to Resume"
          isLoading={loading}
          loadingTitle="Obteniendo datos por favor espere..."
        />
      </form>
    </Form>
  );
}
