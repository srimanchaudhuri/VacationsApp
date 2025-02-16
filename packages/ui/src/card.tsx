import { type JSX } from "react";
import Image from "next/image";
import './styles/golbals.css';

export function Card({
  title,
  description,
  href
}: {
  title: string;
  imgSrc?: string
  description?: string;
  href?: string;
}): JSX.Element {
  return (
    <div className=" w-full flex items-center">
        <div>
            <Image
                className=""
                src="/dashboard_bg.jpg"
                alt="Icon"
                width={150}
                height={150}
            />
        </div>
        <div className="w-full px-4 items-center flex justify-between">
        <div className=" flex flex-col text-lg font-semibold">
            <span>{title}</span>
            <span className=" text-sm font-medium">Spend your time in the hills and valleys of sikkim, a 5 day holiday package.</span>
        </div>
        <div className=" flex flex-col justify-center items-center text-neutral-700 bg-amber-100 px-4 py-2 rounded font-semibold">
            Explore
        </div>
        </div>
    </div>
  );
}
