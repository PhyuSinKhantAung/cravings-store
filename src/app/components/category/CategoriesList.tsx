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
    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
      {data.map((item: CategoryData) => (
        <li key={item.id}>
          <a>{item.name}</a>
        </li>
      ))}
    </ul>
  );
};

export default CategoriesList;
