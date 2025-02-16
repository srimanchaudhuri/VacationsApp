"use client";
import AppbarClient from "../../(components)/AppbarClient";
import { Card } from "../../(components)/Card";

const Packages = () => {
  // Array of package data
  const packages = [
    {
      title: "Sikkim Holiday Package",
      description:
        "Spend your time in the hills and valleys of Sikkim, a 5-day holiday package.",
      price: 4000,
      id: "1",
    },
    {
      title: "Manali Holiday Package",
      description:
        "Escape to the snow-capped mountains of Manali, a 6-day holiday package.",
      price: 8000,
      id: "2",
    },
    {
      title: "Kerala Backwaters",
      description:
        "Relax on the serene backwaters of Kerala, a 4-day holiday package.",
      price: 6000,
      id: "3",
    },
    {
      title: "Goa Beach Getaway",
      description:
        "Unwind on the sandy beaches of Goa, a 5-day holiday package.",
      price: 7000,
      id: "4",
    },
    {
      title: "Shimla Adventure",
      description:
        "Experience the thrill of adventure sports in Shimla, a 3-day holiday package.",
      price: 5500,
      id: "5",
    },
    {
      title: "Rajasthan Desert Safari",
      description:
        "Explore the golden sands of Rajasthan, a 4-day holiday package.",
      price: 7500,
      id: "6",
    },
  ];

  return (
    <div className="w-screen min-h-screen flex flex-col overflow-auto p-6 gap-6">
        <div className="fixed top-0 left-0 w-full z-20 bg-white">
        <AppbarClient />
      </div>
      {/* Sticky Header */}
      <span className="text-3xl underline font-extralight px-6 sticky top-0 bg-white z-10 pt-[4rem]">
        All Packages
      </span>

      {/* Continuous Scroll for Packages */}
      <div className="flex flex-col gap-4">
        {packages.map((pkg) => (
          <Card
            key={pkg.id}
            title={pkg.title}
            description={pkg.description}
            price={pkg.price}
            id={pkg.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Packages;
