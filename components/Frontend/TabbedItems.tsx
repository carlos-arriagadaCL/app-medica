"use client";

import { Tabs } from "flowbite-react";
import { Activity, Microscope, Stethoscope, Syringe } from "lucide-react";
import ServiceList from "./Services/ServiceList";
import LinkCards from "./Doctors/LinkCards";
import { Service, Speciality, Symptom } from "@prisma/client";
import SymptomCards from "./Doctors/SymptomCards";
// import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
// import { MdDashboard } from "react-icons/md";
type TabbedItemsProps = {
  services: Service[];
  specialties: Speciality[];
  symptoms: Symptom[];
};
export default function TabbedItems({
  services,
  specialties,
  symptoms
}: TabbedItemsProps) {
  const tabs = [
    {
      title: "Servicios populares",
      icon: Stethoscope,
      component: <ServiceList data={services} />,
      content: [],
    },
    // {
    //   title: "Doctores",
    //   icon: Microscope,
    //   component: <LinkCards />,
    //   content: [],
    // },
    {
      title: "Especialistas",
      icon: Activity,
      component: <LinkCards className="bg-blue-900" specialties={specialties} />,
      content: [],
    },
    {
      title: "Sintomas",
      icon: Syringe,
      component: <SymptomCards className="bg-pink-950" symptoms={symptoms} />,
      content: [],
    },
  ];
  return (
    <Tabs aria-label="Tabs with underline" variant="underline">
      {tabs.map((tab, i) => {
        return (
          <Tabs.Item key={i} active title={tab.title} icon={tab.icon}>
            {tab.component}
          </Tabs.Item>
        );
      })}
    </Tabs>
  );
}
