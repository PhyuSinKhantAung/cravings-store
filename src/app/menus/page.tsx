"use server";
import React from "react";
import MenusList from "../components/menus/MenusList";
import SearchInput from "../components/ui/SearchInput";
import Dropdown from "../components/ui/Dropdown";
import CategoriesList from "../components/category/CategoriesList";

type SearchParams = {
  page?: string | undefined;
  limit?: string | undefined;
  search?: string | undefined;
};

const MenusPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const query = {
    page: searchParams?.page || "1",
    limit: searchParams?.limit || "10",
    search: searchParams?.search || "",
  };
  return (
    <div className="container mx-auto my-5">
      <div className="lg:max-w-md w-full my-6">
        <SearchInput />
        <Dropdown>
          <CategoriesList />
        </Dropdown>
      </div>
      <MenusList query={query} />
    </div>
  );
};

export default MenusPage;
