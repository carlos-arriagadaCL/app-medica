import React, { useState } from "react";
import SearchBar from "./SearchBar";
import TransitionalText from "./TransitionalText";
import { Ambulance } from "lucide-react";
import { CommandMenu } from "../command-menu";

const Hero = () => {
  const TEXTS = [
    "Medico",
    "Nutricionista",
    "Dermatólogo",
    "Cardiólogo",
    "Traumatólogo",
    "Psicólogo",
  ];
  return (
    <div className="bg-blue-950 dark:bg-slate-950">
      <div className="relative pb-[110px] pt-[50px] dark:bg-dark lg:pt-[50px] mx-auto max-w-6xl">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-5/12">
              <div className="hero-content">
                <h1 className="mb-5 text-4xl font-bold !leading-[1.208] text-gray-50 dark:text-gray-50 sm:text-[42px] lg:text-[40px] xl:text-6xl flex flex-wrap items-center gap-3">
                  <span>Agenda hora con un</span>{" "}
                  <TransitionalText className="text-blue-500" TEXTS={TEXTS} />
                  <br />
                </h1>
                <p className="mb-8 max-w-[480px] text-base text-gray-100 dark:text-gray-50-6">
                  Escoge entre nuestras diversas especialidades médicas y
                  servicios de salud. Ya sea para una consulta general, atención
                  especializada o un chequeo preventivo, estamos aquí para ti.
                </p>
                {/* Barra de busqueda */}
                {/* <SearchBar /> */}
                <div className="w-full flex-1 md:flex-none">
                  <CommandMenu />
                </div>
                {/* Botones */}
                <ul className="flex flex-wrap items-center mt-6">
                  <li>
                    <a
                      href="/#"
                      className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-center text-base font-medium text-white hover:bg-blue-700 lg:px-7"
                    >
                      Consultar exámenes
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#"
                      className="inline-flex items-center justify-center px-5 py-3 text-center text-base font-medium text-gray-50 hover:text-blue-500 dark:text-white"
                    >
                      <span className="mr-2">
                        <Ambulance className="flex-shrink-0 h-5 w-5 text-blue-600" />
                      </span>
                      Pedir ambulancia
                    </a>
                  </li>
                </ul>
                <div className="py-4 pt-8 flex gap-4">
                  <div className="flex flex-col items-center justify-center">
                    <span className="font-bold text-gray-50">600</span>
                    <span className="text-sm text-gray-400">
                      Especialistas medicos
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <span className="font-bold text-gray-50">2000</span>
                    <span className="text-sm text-gray-400">
                      Pacientes atendidos
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden px-4 lg:block lg:w-1/12"></div>
            <div className="w-full px-4 lg:w-6/12">
              <div className="lg:ml-auto lg:text-right">
                <div className="relative z-10 inline-block pt-11 lg:pt-0">
                  <img
                    src="/doc-profile.webp"
                    alt="hero"
                    className="max-w-full lg:ml-auto"
                  />
                  <span className="absolute -bottom-8 -left-8 z-[-1]">
                    <svg
                      width="93"
                      height="93"
                      viewBox="0 0 93 93"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="2.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="90.5" r="2.5" fill="#3056D3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

const SingleImage = ({ href, imgSrc }: { href: string; imgSrc: string }) => {
  return (
    <>
      <a href={href} className="flex w-full items-center justify-center">
        <img src={imgSrc} alt="brand image" className="h-10 w-full" />
      </a>
    </>
  );
};
