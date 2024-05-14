"use client";
import React from "react";
import Select from "../ui/Select";
import { Category } from "@prisma/client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const CategorySelect = ({ categories }: { categories: Category[] }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleMenusByCategory = (categoryName: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("category", categoryName);

    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Select
      onChange={(e: { target: { value: string } }) => {
        handleMenusByCategory(e.target.value);
      }}
      label="All"
    >
      {categories.map((item: Category) => (
        <option value={item.name} key={item.id}>
          {item.name}
        </option>
      ))}
    </Select>
  );
};

export default CategorySelect;
