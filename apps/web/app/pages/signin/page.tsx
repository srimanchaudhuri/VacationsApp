"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const SignInPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push('/pages/dashboard');
    }
  }, [status, router]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError(errorParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/pages/dashboard');
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="/auth_bg.jpg"
        alt="Wallpaper"
        fill
        className="object-cover -z-10"
      />
      <div className="flex justify-around items-center w-full h-full">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className=" flex flex-col p-8 rounded gap-6 w-lg">
            <div className="flex flex-col justify-center mb-4">
              <span className="text-center font-semibold text-slate-800 text-4xl">
                Sign In
              </span>
              <span className=" text-center mt-4 font-semibold text-slate-800">
                Don't have an Account?{" "}
                <span
                  onClick={() => router.push("/pages/signup")}
                  className=" underline cursor-pointer"
                >
                  Sign Up
                </span>
              </span>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                aria-label="Email"
                className=" p-2 shadow-sm bg-white text-slate-800 font-medium rounded focus:outline-none"
                placeholder="Email"
                type="text"
                name="email"
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                aria-label="Password"
                className=" p-2 shadow-sm bg-white text-slate-800 font-medium rounded focus:outline-none"
                placeholder="Password"
                type="password"
                name="password"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                type="submit"
                className=" p-2 shadow-sm shadow-slate-900 rounded font-medium bg-neutral-900 text-white mt-4 cursor-pointer"
              >
                Sign In
              </button>
            </form>
            {error && (
              <div className="flex justify-center font-semibold text-red-500 text-sm">
                {error}, Please try again.
              </div>
            )}
          </div>
        </div>
        <div className="bg-black opacity-40 w-full h-full flex flex-row justify-center items-center p-4">
          <span className=" opacity-100 text-white text-5xl max-w-[58%] font-semibold">
            "The Best View Comes After The Hardest Climb"
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
