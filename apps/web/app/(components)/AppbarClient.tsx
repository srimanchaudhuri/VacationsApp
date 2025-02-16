"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Appbar = () => {
  const session = useSession();
  const router = useRouter();
  return (
    <div className="flex justify-between items-center w-full px-8 py-2 text-neutral-700 border-slate-400 shadow-xs">
      <div onClick={() => {router.push('/pages/dashboard')}} className="text-xl cursor-pointer">Vacations</div>
      <div className="flex flex-col items-center">
        <span>Welcome, <span className=" text-slate-500"> {session.data?.user?.name || ""} </span></span>
      </div>
      <div className=" flex items-center gap-2">
        <span className="mr-3 cursor-pointer">My Packages</span>
        <span
          className="cursor-pointer"
          onClick={async () => {
            await signOut({ callbackUrl: "/pages/signin" });
          }}
        >
          Logout
        </span>
      </div>
    </div>
  );
};

export default Appbar