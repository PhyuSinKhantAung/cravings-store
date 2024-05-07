import prisma from "@/lib/prisma";
import React from "react";
type CategoryData = {
  id: number;
  name: string;
};

export const fetchCategories = async () => {
  const categories = await prisma.category.findMany();
  return {
    data: categories,
  };
};
const CategoriesList = async () => {
  const { data } = await fetchCategories();
  return (
    <>
      {data.map((item: CategoryData) => (
        <li key={item.id} className="lg:list-none ">
          <a className="lg:tab lg:text-xs">{item.name}</a>
        </li>
      ))}
    </>
  );
};

export default CategoriesList;
