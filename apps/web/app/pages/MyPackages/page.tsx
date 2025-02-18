"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppbarClient from "../../(components)/AppbarClient";
import { Card } from "../../(components)/Card";
import Image from "next/image";
import axios from "axios";
import { packageModel } from "../../model/package";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const MyPackages = () => {
  // Array of package data
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState<packageModel[]>([]);
  const router = useRouter()

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/packages?userId=${userId}`)
      .then((res) => {
        setLoading(false);
        setPackages(res.data.packages);
      })
      .catch((e) => {
        console.error(e.message);
      });
  }, []);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Calculate pagination details
  const totalPages = Math.ceil(packages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPackages = packages.slice(startIndex, startIndex + itemsPerPage);

  // Pagination Handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Animation Variants for Framer Motion
  const pageVariants = {
    hidden: { opacity: 0, x: 100 },
    enter: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: {
      opacity: 0,
      x: -100,
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  if (loading) {
    return (
      <div className="p-6">
        <Image
          src="/all_packages_background.jpg"
          alt="Wallpaper"
          fill
          className="object-cover -z-10"
        />

        <div className="absolute inset-0 bg-black opacity-40 -z-10" />

        <div className="space-y-6">
          <div className="fixed top-0 left-0 w-full z-20">
            <AppbarClient mode={"light"} />
          </div>

          {/* Sticky Header */}
          <div className="pt-[2rem] flex justify-center">
            <span className="text-3xl px-6 text-neutral-200 z-10">
              All Packages
            </span>
          </div>
          {/* Simulating multiple card skeletons */}
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse flex flex-col rounded-lg p-4 bg-white opacity-80 shadow-md"
            >
              <div className="h-4 bg-gray-800 opacity-80 rounded-md mb-4"></div>
              <div className="h-2 bg-gray-800 rounded-md w-3/4 mb-2"></div>
              <div className="h-1 bg-gray-800 rounded-md w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-800 rounded-md w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="/all_packages_background.jpg"
        alt="Wallpaper"
        fill
        className="object-cover -z-10"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40 -z-10" />

      <div className="w-screen min-h-screen flex flex-col overflow-auto p-6 gap-6">
        <div className="fixed top-0 left-0 w-full z-20">
          <AppbarClient mode={"light"} />
        </div>

        {packages.length > 0 ? (
          <>
        {/* Sticky Header */}
        <div className="pt-[2rem] flex justify-center">
          <span className="text-3xl px-6 text-neutral-200 z-10">
            All Packages
          </span>
        </div>

            <div className=" opacity-80">
              {/* Smooth Pagination with Framer Motion */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage} // Re-renders on page change
                  initial="hidden"
                  animate="enter"
                  exit="exit"
                  variants={pageVariants}
                  className="flex flex-col gap-6"
                >
                  {currentPackages.map((pkg) => (
                    <Card
                      key={pkg.id}
                      title={pkg.name}
                      description={pkg.description}
                      price={pkg.price}
                      id={pkg.id.toString()}
                      place={pkg.destination}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white rounded-md shadow-md disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white rounded-md shadow-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        ) : (
            <div className=" flex flex-col justify-center items-center">
            <div className="w-full h-full pt-[4rem] flex flex-col justify-center items-center text-4xl font-semibold text-gray-200">
                <span>
                You currently don't have any plans...
                </span>
                <br />
                <br />
                <span 
                onClick={() => {
                    router.push('/pages/packages')
                }}
                className="text-3xl text-blue-300 drop-shadow-[0_0_6px_rgba(255,255,255,0.8)] hover:text-blue-100 cursor-pointer transition duration-300">
                Explore our packages and book your best vacation
                </span>
            </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default MyPackages;
