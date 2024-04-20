"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import checkAuthPage from "@/utils/checkAuthPage";

const Headbar = () => {
  const pathname = usePathname();

  if (checkAuthPage(pathname)) {
    return null;
  } else
    return (
      <div className="w-full bg-neutral text-white">
        <div className="flex md:justify-end justify-center gap-x-4 text-sm p-3 md:mr-6">
          <Link href={`/login`} className=" hover:underline">
            Log in / Guest
          </Link>
          <Link href={`/signup`} className=" hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    );
};

export default Headbar;
