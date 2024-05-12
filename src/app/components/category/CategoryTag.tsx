"use client";
import React, { useEffect, useState } from "react";
import { Category } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const checkCurrentPageIsActivePage = (
  categoryId: number,
  searchParamsCategoryId: string | null
) => {
  if (categoryId.toString() === searchParamsCategoryId) {
    if (categoryId === 0 || !categoryId) return true;
    return true;
  } else {
    return false;
  }
};

const CategoryTag = ({ category }: { category: Category }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [categoryId, setCategoryId] = useState(searchParams.get("category"));

  const handleMenusByCategory = (categoryId: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("category", categoryId.toString());

    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    setCategoryId(
      searchParams.get("category") ? searchParams.get("category") : "0"
    );
  }, [searchParams]);

  return (
    <a
      className={`lg:tab lg:text-xs ${
        checkCurrentPageIsActivePage(category.id, categoryId) &&
        "tab-active font-bold"
      }`}
      onClick={() => {
        handleMenusByCategory(category.id);
      }}
      key={category.id}
    >
      {category.name}
    </a>
  );
};

export default CategoryTag;
