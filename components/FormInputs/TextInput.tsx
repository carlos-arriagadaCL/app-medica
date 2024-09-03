import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Link from "next/link";
import { cn } from "@/lib/utils";

type TextInputProps = {
  label: string;
  register: any;
  name: string;
  errors: any;
  type?: string;
  page?: string;
  placeholder?: string;
  className?: string;
};

export default function TextInput({
  label,
  register,
  name,
  errors,
  type = "text",
  placeholder,
  page,
  className = "col-span-full",
}: TextInputProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      {type === "password" && page === "login" ? (
        <div className="flex items-center">
          <Label htmlFor={`${name}`}>{label}</Label>
          <Link
            href="/forgot-password"
            className="ml-auto inline-block text-sm underline"
          >
            Forgot your password?
          </Link>
        </div>
      ) : (
        <Label htmlFor={`${name}`}>{label}</Label>
      )}

      <Input
        {...register(`${name}`, { required: true })}
        id={`${name}`}
        name={`${name}`}
        type={type}
        autoComplete="name"
        placeholder={placeholder}
      />
      {errors[`${name}`] && (
        <span className="text-red-600 text-sm">Ingrese su {`${label}`}</span>
      )}
    </div>
  );
}
