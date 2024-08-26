"use client";

import { Tabs } from "flowbite-react";
import { Activity, Microscope, Stethoscope, Syringe, X } from "lucide-react";
import ServiceList from "./Services/ServiceList";
import LinkCards from "./Doctors/LinkCards";
// import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
// import { MdDashboard } from "react-icons/md";

export default function TabbedItems() {
  const services = [
    { title: "Telemedicina", image: "/doctor.jpg", slug: "telemedicina" },
    { title: "Salud mental", image: "/doctor.jpg", slug: "telemedicina" },
    { title: "Consulta licencias", image: "/doctor.jpg", slug: "telemedicina" },
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
