"use client";
import React from "react";
import Link from "next/link";
import { User } from "next-auth";
import { usePathname } from "next/navigation";
import LogoutForm from "../auth/LogoutForm";
import checkAuthPage from "@/utils/checkAuthPage";

const Headbar = ({ user }: { user: User | null }) => {
  const pathname = usePathname();

  if (checkAuthPage(pathname)) {
    return null;
  } else
    return (
      <div className="w-full bg-neutral text-white">
        <div className="flex md:justify-end justify-center gap-x-4 text-sm p-3 md:mr-6">
          {user ? (
            <div className=" flex gap-x-5">
              <details className="dropdown">
                <summary className="m-1 btn btn-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-circle-user-round"
                  >
                    <path d="M18 20a6 6 0 0 0-12 0" />
                    <circle cx="12" cy="10" r="4" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>

                  {user.name}
                </summary>
                <ul className="px-2 py-1 shadow menu dropdown-content z-[1] bg-base-100 bg-opacity-25 rounded-box max-w-40">
                  <li>
                    <LogoutForm />
                  </li>
                </ul>
              </details>
            </div>
          ) : (
            <div className="flex gap-x-5">
              <Link href={`/login`} className="hover:underline">
                Log in / Guest
              </Link>
              <Link href={`/signup`} className="hover:underline">
                Create an account
              </Link>
            </div>
          )}
        </div>
      </div>
    );
};

export default Headbar;
