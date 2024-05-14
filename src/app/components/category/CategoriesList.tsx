import prisma from "@/lib/prisma";
import React from "react";
import CategoryTag from "./CategoryTag";
import Select from "../ui/Select";
import Tabs from "../ui/Tabs";
import CategorySelect from "./CategorySelect";

export const fetchCategories = async () => {
  const categories = await prisma.category.findMany();
  return {
    data: categories,
  };
};

const CategoriesList = async () => {
  const { data } = await fetchCategories();

  const categories = [{ id: 0, name: "All" }, ...data];

  return (
    <>
      <div className="lg:hidden">
        <CategorySelect categories={categories} />
      </div>

      <div className="hidden lg:block">
        {/* For desktop */}
        <CategoryTag categories={categories} />
      </div>
    </>
  );
};

export default CategoriesList;
