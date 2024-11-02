import { DoctorProfileAvailability } from "@/types/types";

export const getDayName = (): keyof DoctorProfileAvailability => {
  const daysOfWeek: (keyof DoctorProfileAvailability)[] = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const today = new Date();
  const dayName = daysOfWeek[today.getDay()];
  return dayName;
};