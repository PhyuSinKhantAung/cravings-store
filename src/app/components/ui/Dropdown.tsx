"use client";
import React from "react";

const Dropdown = ({ children }: React.PropsWithChildren) => {
  return (
    <details className="dropdown">
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
      {children}
    </details>
  );
};

export default Dropdown;
