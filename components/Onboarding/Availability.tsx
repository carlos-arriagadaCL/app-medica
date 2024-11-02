"use client";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { BioDataFormProps } from "@/types/types";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import { useRouter } from "next/navigation";
import { DatePickerInput } from "../FormInputs/DatePickerInput";
import RadioInput from "../FormInputs/RadioInput";
import toast from "react-hot-toast";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { StepFormProps } from "./BioDataForm";

export default function Availability({
  page,
  title,
  description,
  nextPage,
  formId,
  userId,
}: StepFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BioDataFormProps>();
  const availabilityOptions = [
    {
      label:
        "Weekly (You're available one or more times during the week, every week.)",
      value: "weekly",
    },
    {
      label: "Specific Dates (You're only available on specific dates.)",
      value: "specific",
    },
  ];
  const router = useRouter();
  async function onSubmit(data: BioDataFormProps) {
    data.page = page;
    console.log(data);
    // setIsLoading(true);
  }
  return (
    <div className="w-full">
      <div className="text-center border-b border-gray-200 pb-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          {title}
        </h1>
        <p className="text-balance text-muted-foreground">{description}</p>
      </div>
      <form className=" py-4 px-4 mx-auto " onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-2">
          <TextInput
            id="meetingDuration"
            label="What is the Duration of your Meetings"
            register={register}
            name="meetingDuration"
            errors={errors}
            placeholder="Enter the duration of your meetings"
            className="col-span-full sm:col-span-1"
          />
          <RadioInput
            radioOptions={availabilityOptions}
            errors={errors}
            title="When are you available for this meeting ?"
            name="availability"
            register={register}
          />
          <div className="col-span-full">
            <h2>Define your weekly availability below:</h2>
            <div className="border py-6 px-4 border-gray-200 flex items-center justify-between">
              {/* Checkbox */}
              <div className="mr-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="day" />
                  <label
                    htmlFor="day"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Monday
                  </label>
                </div>
              </div>
              {/* Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-3 gap-2">
                  <Select>
                    <SelectTrigger id="hour">
                      <SelectValue placeholder="00" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem
                          key={i}
                          value={`${(i + 1).toString().padStart(2, "0")}`}
                        >
                          {(i + 1).toString().padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger id="minute">
                      <SelectValue placeholder="00" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 59 }, (_, i) => (
                        <SelectItem
                          key={i}
                          value={`${(i + 1).toString().padStart(2, "0")}`}
                        >
                          {(i + 1).toString().padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger id="">
                      <SelectValue placeholder="AM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Select>
                    <SelectTrigger id="hour">
                      <SelectValue placeholder="00" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem
                          key={i}
                          value={`${(i + 1).toString().padStart(2, "0")}`}
                        >
                          {(i + 1).toString().padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger id="minute">
                      <SelectValue placeholder="00" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 59 }, (_, i) => (
                        <SelectItem
                          key={i}
                          value={`${(i + 1).toString().padStart(2, "0")}`}
                        >
                          {(i + 1).toString().padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger id="">
                      <SelectValue placeholder="PM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Add window */}
              <div className="">
                <Button variant="ghost">
                  <Plus className="w-5 h-5 flex-shrink-0" />
                  Add Window
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center items-center">
          <SubmitButton
            id="submit"
            title="Guardar y continuar"
            isLoading={isLoading}
            loadingTitle="Guardando por favor espere..."
          />
        </div>
      </form>
    </div>
  );
}
