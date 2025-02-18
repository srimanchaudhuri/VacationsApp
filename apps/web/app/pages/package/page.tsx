"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Appbar from "../../(components)/AppbarClient";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { packageModel } from "../../model/package";
import axios from "axios";

const Package = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [packageDetails, setPackageDetails] = useState<packageModel>()

  console.log(id);
  useEffect(() => {
    axios.get(`http://localhost:3000/api/packages/${id}`)
    .then((res) => {
      setPackageDetails(res.data.package)
    })
  }, [id])

// State for selected start and end dates with explicit types
const [startDate, setStartDate] = useState<Date | null>(null);
const [endDate, setEndDate] = useState<Date | null>(null);


  return (
    <div className="w-screen min-h-screen flex flex-col">
      {/* Appbar */}
      <Appbar />

      {/* Cover Image */}
      <div className="w-full h-[500px] overflow-hidden">
        <img
          src="/dashboard_bg.jpg"
          alt={packageDetails?.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Package Details */}
      <div className="w-full max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4">{packageDetails?.name}</h1>
        <p className="text-xl text-gray-600 mb-4">
          {packageDetails?.description}
        </p>
        <div className="text-2xl font-semibold text-neutral-800 mb-4">
          Price: <span className="font-light">₹{packageDetails?.price}</span>
        </div>
        <div className="text-2xl font-semibold text-neutral-800 mb-4 ">
          Duration: <span className="font-light">{packageDetails?.days} days</span>
        </div>

        {/* Date Picker */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Select Travel Dates:</h2>
          <div className="flex space-x-4 items-center">
            <div>
              <label className="block text-gray-700 mb-1">Start Date:</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                className="px-4 py-2 border rounded-md"
                placeholderText="Select Start Date"
                />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">End Date:</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate || new Date()}
                className="px-4 py-2 border rounded-md"
                placeholderText="Select End Date"
              />
            </div>
          </div>
        </div>

        {/* Book Now Button */}
        <button className="cursor-pointer px-6 py-3 bg-neutral-800 text-white font-semibold rounded-md hover:bg-neutral-600 transition-all">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Package;
