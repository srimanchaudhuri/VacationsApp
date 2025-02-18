"use client";
import { type JSX } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function Card({
  title,
  description,
  id,
  price,
  imgSrc,
  place,
}: {
  title: string;
  imgSrc?: string;
  description: string;
  id: string;
  price: number
  place?: string
}): JSX.Element {
  const router = useRouter();

  return (
    <div className=" w-full flex items-center p-2 bg-neutral-100 shadow-sm rounded">
      <div className="">
        <Image
          className="rounded-sm"
          src="/dashboard_bg.jpg"
          alt="Icon"
          width={150}
          height={150}
        />
      </div>
      <div className="w-full px-4 items-center flex justify-between">
        <div className=" flex flex-col text-lg font-semibold">
          <span>{title}</span>
          <span className=" text-sm font-medium">{description}</span>
          <span className=" text-sm">Price:  ₹{price}/person</span>
          <span className=" text-sm">Destination:  {place}</span>
        </div>
        <div
          onClick={() => {
            router.push(`package/?id=${id}`);
          }}
          className="cursor-pointer flex flex-col justify-center items-center text-neutral-50 bg-neutral-800 hover:bg-neutral-950 transition px-4 py-2 rounded font-extralight text-sm"
        >
          Explore
        </div>
      </div>
    </div>
  );
}
