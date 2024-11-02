import { DoctorProfileAvailability } from "@/types/types";

export function getDayFromDate(dateString: string | undefined) {
  const daysOfWeek: (keyof DoctorProfileAvailability)[] = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  if (dateString) {
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  }
  const today = new Date();
  const dayName = daysOfWeek[today.getDay()];
  return dayName;
}
