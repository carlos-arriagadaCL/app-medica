import React from "react";
import TabbedItems from "./TabbedItems";

const TabbedSection = () => {
  return (
    <section className="pb-12 pt-20 dark:bg-dark lg:py-[60px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-5xl text-center lg:mb-20">
              
              <p className="text-base text-body-color dark:text-dark-6">
                Escoge entre diferentes profesionales adaptados a tus
                necesidades. Reserva en linea hoy.
              </p>
            </div>
          </div>
        </div>

        {/* PESTAÑAS */}
        <div className="mx-auto max-w-6xl">
          <TabbedItems />
        </div>
      </div>
    </section>
  );
};

export default TabbedSection;
