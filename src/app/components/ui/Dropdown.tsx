"use client";
import React from "react";

const Dropdown = ({ children }: React.PropsWithChildren) => {
  return (
    <details className="dropdown lg:hidden">
      <summary className="m-1 btn">
        {" "}
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
          className="lucide lucide-filter"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        Category
      </summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        {children}
      </ul>
    </details>
  );
};

export default Dropdown;
