import React from "react";
import MenusList from "../components/menus/MenusList";
import SearchInput from "../components/ui/SearchInput";
import Dropdown from "../components/ui/Dropdown";
import CategoriesList, {
  fetchCategories,
} from "../components/category/CategoriesList";
import Tabs from "../components/ui/Tabs";
import { Category } from "@prisma/client";

type SearchParams = {
  page?: string | undefined;
  limit?: string | undefined;
  search?: string | undefined;
  category?: string | undefined;
};

const MenusPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const query = {
    page: searchParams?.page || "1",
    limit: searchParams?.limit || "10",
    search: searchParams?.search || "",
    category: searchParams?.category || "",
  };

  const { data: categories } = await fetchCategories();
  const c = categories.find((item: Category) => item.name === query.category);
  const modifiedQuery = { ...query, category: c?.id || 0 };

  return (
    <div className="w-full my-5 lg:flex lg:gap-x-5">
      <div className="lg:w-1/6 my-6 flex flex-col gap-y-3">
        <SearchInput />

        <CategoriesList />
      </div>
      <div className="lg:w-4/5">
        <MenusList query={modifiedQuery} />
      </div>
    </div>
  );
};

export default MenusPage;
