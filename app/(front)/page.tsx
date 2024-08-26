import DoctorsList from "@/components/DoctorsList";
import Brands from "@/components/Frontend/Brands";
import Hero from "@/components/Frontend/Hero";
import MegaMenu from "@/components/Frontend/MegaMenu";
import TabbedSection from "@/components/Frontend/TabbedSection";
import React from "react";

export default function Home() {
  return (
    <section className="">
      <Hero />
      <Brands />
      <TabbedSection />
      <DoctorsList />
      <DoctorsList
        className="bg-white py-8 lg:py-24"
        title="Visita medica"
        isInPerson={true}
      />
    </section>
  );
}
