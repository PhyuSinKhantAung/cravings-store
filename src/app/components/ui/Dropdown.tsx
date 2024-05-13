import React from "react";
import { fetchCategories } from "../category/CategoriesList";
import { Category } from "@prisma/client";

type Props = {
  categoryId: string;
  children: React.ReactNode;
};

const Dropdown = async ({ categoryId, children }: Props) => {
  const { data } = await fetchCategories();
  const category = data.find(
    (item: Category) => item.id === Number(categoryId)
  );

  return (
    <div className="dropdown lg:hidden">
      <div className="m-1 btn" tabIndex={1} role="button">
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
        <div>{category?.name || "Category"}</div>
      </div>
      <ul
        tabIndex={1}
        className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
      >
        {children}
      </ul>
    </div>
  );
};

export default Dropdown;
