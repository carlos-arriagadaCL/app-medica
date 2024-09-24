import { Loader2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

type SubmitButtonProps = {
  id: string;
  title: string;
  buttonType?: "submit" | "reset" | "button" | undefined;
  isLoading: boolean;
  loadingTitle: string;
};

export default function SubmitButton({
  id,
  title,
  buttonType = "submit",
  isLoading = false,
  loadingTitle,
}: SubmitButtonProps) {
  return (
    <>
      {isLoading ? (
        <Button id={id} disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingTitle}
        </Button>
      ) : (
        <Button id={id} type={buttonType}>
          {title}
        </Button>
      )}
    </>
  );
}
