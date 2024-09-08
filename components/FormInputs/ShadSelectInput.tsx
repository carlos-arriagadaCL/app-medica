import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type SelectInputProps = {
  label: string;
  optionTitle: string;
  className?: string;
  options: SelectOption[];
  selectedOption: any;
  setSelectedOption: any;
};
export type SelectOption = {
  value: string;
  label: string;
};

export function ShadSelectInput({
  label,
  className = "sm:col-span-2",
  optionTitle,
  options = [],
  selectedOption,
  setSelectedOption,
}: SelectInputProps) {
  return (
    <Select>
      <SelectTrigger className={className}>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{optionTitle}</SelectLabel>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              onClick={() => setSelectedOption(option)}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
