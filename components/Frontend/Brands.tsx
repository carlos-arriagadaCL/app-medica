import React from "react";

export type SingleImageProps = {
  brand: {
    link: string;
    imageSrc: string;
    altText: string;
  };
};

const brandsData = [
  {
    imageSrc:
      "https://cdn.tailgrids.com/2.2/assets/images/brands/graygrids.svg",
    altText: "graygrids",
    link: "#",
  },
  {
    imageSrc:
      "https://cdn.tailgrids.com/2.2/assets/images/brands/lineicons.svg",
    altText: "lineicons",
    link: "#",
  },
  {
    imageSrc: "https://cdn.tailgrids.com/2.2/assets/images/brands/uideck.svg",
    altText: "uideck",
    link: "#",
  },
  {
    imageSrc: "https://cdn.tailgrids.com/2.2/assets/images/brands/ayroui.svg",
    altText: "ayroui",
    link: "#",
  },
];

export default function Brands() {
  return (
    <>
      <section className="bg-slate-100 text-slate-800 py-10 lg:py-[60px]">
        <h2 className="text-center pb-6 scroll-m-20 text-2xl font-semibold tracking-tight">
          Trusted by
        </h2>
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="flex flex-wrap items-center justify-center">
                {brandsData.map((brand, i) => (
                  <SingleImage key={i} brand={brand} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const SingleImage = ({ brand }: SingleImageProps) => {
  const { link, imageSrc, altText } = brand;
  return (
    <a
      href={link}
      className="mx-4 flex w-[150px] items-center justify-center py-5 2xl:w-[180px]"
    >
      <img src={imageSrc} alt={altText} className="h-10 w-full" />
    </a>
  );
};
