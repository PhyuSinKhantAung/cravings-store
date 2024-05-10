"use client";
import React from "react";
import { Category } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CategoryTag = ({ category }: { category: Category }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleMenusByCategory = (categoryId: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("category", categoryId.toString());

    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <a
      className={`lg:tab lg:text-xs ${
        category.id.toString() === searchParams.get("category") &&
        "tab-active font-bold"
      } ${category.name === "all" && "tab-active font-bold"}`}
      onClick={() => {
        handleMenusByCategory(category.id);
      }}
    >
      {category.name}
    </a>
  );
};

export default CategoryTag;
