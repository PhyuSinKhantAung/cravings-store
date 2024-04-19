import React from "react";
import Link from "next/link";

const Headbar = () => {
  return (
    <div className="w-full bg-neutral text-white">
      <div className="flex md:justify-end justify-center gap-x-4 text-sm p-3 md:mr-6">
        <Link href={`/signin`} className=" hover:underline">
          Sign in / Guest
        </Link>
        <Link href={`/signup`} className=" hover:underline">
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default Headbar;
