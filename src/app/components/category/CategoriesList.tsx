import prisma from "@/lib/prisma";
import React from "react";
import CategoryTag from "./CategoryTag";
import { Category } from "@prisma/client";

export const fetchCategories = async () => {
  const categories = await prisma.category.findMany();
  return {
    data: categories,
  };
};

const CategoriesList = async () => {
  const { data } = await fetchCategories();

  const all = {
    id: 0,
    name: "All",
  };

  return (
    <>
      <li className="lg:list-none">
        <CategoryTag category={all} />
      </li>
      {data.map((item: Category) => (
        <li key={item.id} className="lg:list-none">
          <CategoryTag category={item} />
        </li>
      ))}
    </>
  );
};

export default CategoriesList;
