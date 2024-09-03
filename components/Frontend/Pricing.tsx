import Link from "next/link";
import React from "react";

export default function Pricing() {
  const plans = [
    {
      name: "Basic plan",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 12,
      isMostPop: false,
      features: [
        "Curabitur faucibus",
        "massa ut pretium maximus",
        "Sed posuere nisi",
        "Pellentesque eu nibh et neque",
        "Suspendisse a leo",
        "Praesent quis venenatis ipsum",
        "Duis non diam vel tortor",
      ],
      getStarted: "/register?role=DOCTOR&plan=free",
    },
    {
      name: "Startup",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 35,
      isMostPop: true,
      features: [
        "Curabitur faucibus",
        "massa ut pretium maximus",
        "Sed posuere nisi",
        "Pellentesque eu nibh et neque",
        "Suspendisse a leo",
        "Praesent quis venenatis ipsum",
        "Duis non diam vel tortor",
      ],
      getStarted: "/register?role=DOCTOR&plan=professional",
    },
    {
      name: "Enterprise",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 60,
      isMostPop: false,
      features: [
        "Curabitur faucibus",
        "massa ut pretium maximus",
        "Sed posuere nisi",
        "Pellentesque eu nibh et neque",
        "Suspendisse a leo",
        "Praesent quis venenatis ipsum",
        "Duis non diam vel tortor",
      ],
      getStarted: "/register?role=DOCTOR&plan=enterprise",
    },
  ];

  return (
    <section className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="relative max-w-xl mx-auto sm:text-center">
          <h3 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-gray-800 dark:text-slate-300 sm:text-4xl">
            Pricing for all sizes
          </h3>
          <div className="mt-3 max-w-xl">
            <p className="leading-7 [&:not(:first-child)]:mt-6 dark:text-slate-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              efficitur consequat nunc.
            </p>
          </div>
        </div>
        <div className="mt-16 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3">
          {plans.map((item, idx) => (
            <div
              key={idx}
              className={`relative flex-1 flex items-stretch flex-col rounded-xl border-2 mt-6 sm:mt-0 ${
                item.isMostPop ? "mt-10" : ""
              }`}
            >
              {item.isMostPop ? (
                <span className="w-32 absolute -top-5 left-0 right-0 mx-auto px-3 py-2 rounded-full border shadow-md bg-white text-center text-gray-700 text-sm font-semibold">
                  Most popular
                </span>
              ) : (
                ""
              )}
              <div className="p-8 space-y-4 border-b">
                <span className="text-indigo-600 font-bold uppercase tracking-widest">
                  {item.name}
                </span>
                <div className="text-gray-800 dark:text-gray-300 text-3xl font-semibold">
                  ${item.price}{" "}
                  <span className="text-xl text-gray-600 font-normal">/mo</span>
                </div>
                <p>{item.desc}</p>
                <Link
                  href={item.getStarted}
                  className="px-3 block text-center py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700"
                >
                  Get Started
                </Link>
              </div>
              <ul className="p-8 space-y-3">
                <li className="pb-2 text-gray-800 dark:text-gray-500 font-medium">
                  <p>Features</p>
                </li>
                {item.features.map((featureItem, idx) => (
                  <li key={idx} className="flex items-center gap-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-indigo-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {featureItem}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
