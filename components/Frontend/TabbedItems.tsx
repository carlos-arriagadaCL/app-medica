"use client";

import { Tabs } from "flowbite-react";
import { Activity, Microscope, Stethoscope, Syringe } from "lucide-react";
import ServiceList from "./Services/ServiceList";
import LinkCards from "./Doctors/LinkCards";
// import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
// import { MdDashboard } from "react-icons/md";

export default function TabbedItems() {
  const services = [
    {
      title: "Telemedicina",
      image: "/hospital-logo.webp",
      slug: "telemedicina",
    },
    {
      title: "Salud mental",
      image: "/hospital-logo.webp",
      slug: "telemedicina",
    },
    {
      title: "Consulta licencias",
      image: "/hospital-logo.webp",
      slug: "telemedicina",
    },
  ];
  const tabs = [
    {
      title: "Servicios populares",
      icon: Stethoscope,
      component: <ServiceList data={services} />,
      content: [],
    },
    {
      title: "Doctores",
      icon: Microscope,
      component: <LinkCards />,
      content: [],
    },
    {
      title: "Especialistas",
      icon: Activity,
      component: <LinkCards className="bg-blue-900" />,
      content: [],
    },
    {
      title: "Sintomas",
      icon: Syringe,
      component: <LinkCards className="bg-pink-950" />,
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
