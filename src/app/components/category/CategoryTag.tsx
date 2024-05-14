"use client";
import React, { useEffect, useState } from "react";
import { Category } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { boolean } from "zod";
import Tabs from "../ui/Tabs";

const checkCurrentPageIsActivePage = (
  categoryName: string,
  searchParamsCategoryName: string | null
) => {
  if (!searchParamsCategoryName && categoryName === "All") return true;

  if (categoryName === searchParamsCategoryName) {
    return true;
  } else {
    return false;
  }
};

const CategoryTag = ({ categories }: { categories: Category[] }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [categoryName, setCategoryName] = useState(
    searchParams.get("category")
  );

  const handleMenusByCategory = (categoryName: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("category", categoryName);

    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    setCategoryName(
      searchParams.get("category") ? searchParams.get("category") : "All"
    );
  }, [searchParams]);

  return (
    <Tabs>
      {categories.map((item: Category) => (
        <li key={item.id} className="lg:list-none">
          <a
            className={`lg:tab lg:text-xs ${
              checkCurrentPageIsActivePage(item.name, categoryName) &&
              "tab-active font-bold"
            }`}
            onClick={() => {
              handleMenusByCategory(item.name);
            }}
            key={item.id}
          >
            {item.name}
          </a>
        </li>
      ))}
    </Tabs>
  );
};

export default CategoryTag;
