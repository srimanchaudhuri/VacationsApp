"use client"

import { useSearchParams } from "next/navigation";
import Appbar from "../../(components)/AppbarClient";

const Package = () => {

    const searchParams = useSearchParams();
    const id = searchParams.get("id");
  // Dummy Package Data (You can replace this with dynamic data later)
  const packageDetails = {
    title: "Sikkim Holiday Package",
    description:
      "Spend your time in the hills and valleys of Sikkim, exploring beautiful landscapes, monasteries, and local culture. This 5-day holiday package includes guided tours, accommodation, and meals.",
    price: 4000,
    duration: "5 Days / 4 Nights",
    coverImage:
      "https://images.unsplash.com/photo-1585487000053-c56d1e91c6c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Replace with your image URL
    itinerary: [
      "Day 1: Arrival at Gangtok",
      "Day 2: Sightseeing in Gangtok",
      "Day 3: Travel to Pelling",
      "Day 4: Pelling Local Tour",
      "Day 5: Departure",
    ],
    inclusions: [
      "Accommodation in 3-star hotels",
      "Daily breakfast and dinner",
      "Sightseeing tours and transfers",
      "Experienced local guides",
    ],
  };

  return (
    <div className="w-screen min-h-screen flex flex-col">
      {/* Appbar */}
      <Appbar />

      {/* Cover Image */}
      <div className="w-full h-[500px] overflow-hidden">
        <img
          src="/dashboard_bg.jpg"
          alt={packageDetails.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Package Details */}
      <div className="w-full max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4">{packageDetails.title}</h1>
        <p className="text-xl text-gray-600 mb-4">
          {packageDetails.description}
        </p>
        <div className="text-2xl font-semibold text-neutral-800 mb-4">
          Price: ₹{packageDetails.price}
        </div>
        <div className="text-lg text-gray-700 mb-4">
          Duration: {packageDetails.duration}
        </div>

        {/* Itinerary */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Itinerary:</h2>
          <ul className="list-disc ml-6 space-y-2">
            {packageDetails.itinerary.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Inclusions */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Inclusions:</h2>
          <ul className="list-disc ml-6 space-y-2">
            {packageDetails.inclusions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Book Now Button */}
        <button className=" cursor-pointer px-6 py-3 bg-neutral-800 text-white font-semibold rounded-md hover:bg-neutral-600 transition-all">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Package;
