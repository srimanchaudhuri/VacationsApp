"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const Appbar = ({ mode = "dark" }: { mode?: string }) => {
  const session = useSession();
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch user ID using email from session
  useEffect(() => {
    const fetchUserId = async () => {
      if (session.data?.user?.email) {
        try {
          const res = await axios.get(`/api/user/getUserByEmail?email=${session.data.user.email}`);
          setUserId(res.data.id);
        } catch (error) {
          console.error("Error fetching user ID:", error);
        }
      }
    };
    fetchUserId();
  }, [session.data?.user?.email]);

  return (
    <div className={`flex justify-between items-center w-full px-8 py-2 border-slate-400 shadow-xs ${mode === 'dark' ? 'text-neutral-700' : 'text-neutral-200'}`}>
      <div onClick={() => { router.push('/pages/dashboard') }} className="text-xl cursor-pointer">Vacations</div>
      <div className="flex flex-col items-center">
        <span>Welcome, <span className={`${mode === "dark" ? "text-slate-500" : "text-slate-300"}`}> {session.data?.user?.name || ""} </span></span>
      </div>
      <div className="flex items-center gap-2">
        <span onClick={() => { router.push(`/pages/MyPackages?userId=${userId}`) }} className="mr-3 cursor-pointer">My Packages</span>
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

export default Appbar;
