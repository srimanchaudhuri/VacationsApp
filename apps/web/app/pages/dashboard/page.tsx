"use client";

import AppbarClient from "../../(components)/AppbarClient";
import Image from "next/image";
import { Card } from "../../(components)/Card";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  useEffect(() => {
    // Disable normal scrolling
    document.body.style.overflow = "hidden";
    return () => {
      // Re-enable scrolling on component unmount
      document.body.style.overflow = "auto";
    };
  }, []);

  const router = useRouter()

  const handleScrollDown = () => {
    const packagesSection = document.getElementById("packages");
    packagesSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollUp = () => {
    const frontPage = document.getElementById("frontpage");
    frontPage?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="overflow-hidden">
      {/* Locked Appbar */}
      <div className="fixed top-0 left-0 w-full z-20">
        <AppbarClient />
      </div>

      {/* Frontpage Section */}
      <div
        id="frontpage"
        className="relative w-screen h-screen pt-[4rem]" // Add padding to account for Appbar height
      >
        {/* Background Image */}
        <Image
          src="/dashboard_bg.jpg"
          alt="Wallpaper"
          fill
          className="object-cover -z-10"
        />

        <div className="w-full h-full flex flex-col justify-center items-center mb-10">
          <span className="text-neutral-800 text-4xl font-extrabold">
            Book Your Most Memorable Vacation...
          </span>
          <span className="text-neutral-800 text-xl font-semibold">
            We travel not to escape life, but for life not to escape us...
          </span>
          <span className="text-neutral-800 text-xl font-semibold">
            <span
              onClick={handleScrollDown}
              className="cursor-pointer text-slate-400 drop-shadow-[0_0_6px_rgba(255,255,255,0.8)] hover:text-white transition duration-300"
            >
              click here
            </span>
            <span className="opacity-0">x</span>
            to explore our packages.
          </span>
        </div>
      </div>

      {/* Packages Section */}
      <div
        id="packages"
        className="w-full min-h-screen h-full flex flex-col items-center px-4 gap-5 mt-4 pt-[4rem]" // Add padding to account for Appbar height
      >

        <div className="w-full flex justify-between items-center px-6">
          <span className="text-3xl font-extralight underline">
          Lastest Packages
          </span>
        <button
          onClick={handleScrollUp}
          className=" px-4 p-2 bg-neutral-900 text-white rounded-full shadow-lg hover:bg-neutral-700 transition duration-300 cursor-pointer"
        >
          Scroll Up
        </button>
        </div>

        <Card
          title={"Sikkim Holiday Package"}
          description={
            "Spend your time in the hills and valleys of Sikkim, a 5-day holiday package."
          }
          price={4000}
          id="1"
        />

        <Card
          title={"Manali Holiday Package"}
          description={
            "Escape to the snow-capped mountains of Manali, a 6-day holiday package."
          }
          price={8000}
          id="2"
        />

        <Card
          title={"Kerala Backwaters"}
          description={
            "Relax on the serene backwaters of Kerala, a 4-day holiday package."
          }
          price={6000}
          id="3"
        />

        <Card
          title={"Goa Beach Getaway"}
          description={
            "Unwind on the sandy beaches of Goa, a 5-day holiday package."
          }
          price={7000}
          id="4"
        />

        <button
        onClick={() => {router.push('packages')}}
        className="bg-neutral-900 hover:bg-neutral-700 transition duration-300 p-4 rounded w-full text-white cursor-pointer">
          Explore All Packages
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
