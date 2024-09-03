import Link from "next/link";
import Image from "next/image";
import React from "react";
import CustomButton from "@/components/CustomButton";
import { Check } from "lucide-react";
import CustomAccordion, {
  FAQItem,
} from "@/components/Frontend/CustomAccordion";
import Pricing from "@/components/Frontend/Pricing";

export default function page() {
  const features = [
    "La plataforma le muestra pacientes que requieran de su servicio",
    "Generacion de boleta electronica",
    "Integracion con toma de examenes clinicos",
  ];
  const steps = [
    "Registra tu especialidad",
    "Crea ofertas competitivas",
    "Empieza atender pacientes",
  ];
  const cards = [
    {
      title: "Empieza a ofrecer servicio",
      description:
        "Aplica para unirte a nuestra red de proveedores de la salud.",
      link: "/",
      linkTitle: "Aplicar a un puesto",
    },
    {
      title: "Reanuda un proceso de aplicacion",
      description:
        "Aplica para unirte a nuestra red de proveedores de la salud.",
      link: "/",
      linkTitle: "Aplicar a un puesto",
    },
    {
      title: "Agenda una video-llamada",
      description:
        "Aplica para unirte a nuestra red de proveedores de la salud.",
      link: "/",
      linkTitle: "Aplicar a un puesto",
    },
    {
      title: "Consulta el estado de tu aplicacion",
      description:
        "Aplica para unirte a nuestra red de proveedores de la salud.",
      link: "/",
      linkTitle: "Aplicar a un puesto",
    },
  ];
  const faqs: FAQItem[] = [
    {
      qn: "¿Qué es app-medica?",
      ans: "App-medica es una plataforma web donde los profesionales de la salud pueden registrarse para ofrecer sus servicios especializados a pacientes que los necesitan.",
    },
    {
      qn: "¿Cómo me registro en app-medica como profesional de la salud?",
      ans: (
        <>
          Para registrarte, ve a la página de registro y completa el formulario
          con tu información personal y profesional. Asegúrate de tener tus
          documentos de certificación listos para subir.
        </>
      ),
    },
    {
      qn: "¿Cómo los pacientes encuentran mi perfil en app-medica?",
      ans: "Los pacientes pueden buscar profesionales de la salud según su especialidad, ubicación, y disponibilidad. Una vez que tu perfil esté completo, será visible para los pacientes que busquen tus servicios.",
    },
    {
      qn: "¿Qué servicios puedo ofrecer en app-medica?",
      ans: "Puedes ofrecer una amplia gama de servicios de salud según tu especialización, incluyendo consultas, asesorías, tratamientos, y seguimientos.",
    },
    {
      qn: "¿Cómo reciben los pacientes los servicios que ofrezco?",
      ans: (
        <>
          Los pacientes pueden agendar una cita contigo directamente a través de
          la plataforma. Podrán elegir entre consultas presenciales, virtuales o
          una combinación según lo que ofrezcas.
        </>
      ),
    },
    {
      qn: "¿Cómo se realiza el pago de los servicios en app-medica?",
      ans: "El pago se realiza de manera segura a través de la plataforma. Una vez que el paciente realiza el pago, los fondos se retienen hasta que se complete el servicio, y luego se transfieren a tu cuenta.",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="py-12 px-4">
        <div className="max-w-6xl gap-4 mx-auto grid grid-cols-1 md:grid-cols-2">
          <div className="">
            <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Unete a la plataforma medica en donde recibes{" "}
              <span className="text-blue-600 font-semibold">pago directo</span>{" "}
              por tu servicio.
            </h2>
            <p className="py-4">
              Conectamos pacientes con especialistas de la salud de forma muy
              facil.
            </p>
            <CustomButton
              title="Unirse al equipo medico"
              href="#"
              className="bg-blue-600 dark:bg-slate-200 hover:bg-blue-800"
            />
            <div className="py-6">
              {features.map((feature, i) => {
                return (
                  <p key={i} className="flex items-center">
                    <Check className="w-4 h-4 mr-2 flex-shrink-0 text-blue-500" />
                    {feature}
                  </p>
                );
              })}
            </div>
          </div>
          <Image
            src="/doc-profile.webp"
            alt=""
            width={1170}
            height={848}
            className="w-full"
          />
        </div>
      </section>
      <section className="py-20 px-4">
        <div className="max-w-6xl gap-8 mx-auto grid grid-cols-1 md:grid-cols-2">
          <Image
            src="/doc-profile.webp"
            alt=""
            width={1170}
            height={848}
            className="w-full hidden md:block mr-4"
          />
          <div className="">
            <h2 className="sm:text-4xl text-2xl">
              Unete a la plataforma medica y empieza a{" "}
              <span className="text-blue-600 font-semibold">
                generar ganancias
              </span>{" "}
              por cliente atendido.
            </h2>
            <div className="py-6">
              {steps.map((feature, i) => {
                return (
                  <p key={i} className="flex items-center">
                    <Check className="w-4 h-4 mr-2 flex-shrink-0 text-blue-500" />
                    {feature}
                  </p>
                );
              })}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {cards.map((card, i) => {
                return (
                  <div
                    key={i}
                    className="bg-blue-900 p-4 rounded-lg shadow-2xl text-center"
                  >
                    <h3 className="text-2xl font-semibold text-white">
                      {card.title}
                    </h3>
                    <p className="text-gray-200 text-xs py-3">
                      {card.description}
                    </p>
                    <CustomButton
                      title={card.linkTitle}
                      href={card.link}
                      className="bg-blue-600 hover:bg-blue-800"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 px-4">
        <div className="max-w-6xl gap-4 mx-auto">
          <Pricing />
        </div>
      </section>
      <section className="py-12 px-4">
        <div className="max-w-2xl gap-4 mx-auto">
          <CustomAccordion FAQS={faqs} />
        </div>
      </section>
    </div>
  );
}
