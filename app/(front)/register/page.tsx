import RegisterWithBg from "@/components/Auth/Register";
import React from "react";

export default function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { role, plan } = searchParams;

  return (
    <div className="">
      <RegisterWithBg role={role} plan={plan} />
    </div>
  );
}
