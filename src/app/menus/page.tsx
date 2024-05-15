import React, { Suspense } from "react";
import MenusList from "../components/menus/MenusList";
import SearchInput from "../components/ui/SearchInput";
import CategoriesList, {
  fetchCategories,
} from "../components/category/CategoriesList";
import { Category } from "@prisma/client";
import CardSkeleton from "../components/ui/CardSkeleton";
import MenuCardLayout from "../components/menus/MenuCardLayout";
import TextSkeleton from "../components/ui/TextSkeleton";

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

  const key = JSON.stringify(searchParams);

  return (
    <div className="w-full my-5 lg:flex lg:gap-x-5">
      <div className="lg:w-1/6 my-6 flex flex-col gap-y-3">
        <SearchInput />

        <Suspense
          fallback={
            <div>
              <div className="skeleton h-12 w-52 lg:hidden"></div>

              <div className="hidden lg:flex lg:flex-col gap-y-4">
                <TextSkeleton size="sm"></TextSkeleton>
                <TextSkeleton></TextSkeleton>
                <TextSkeleton size="sm"></TextSkeleton>
                <TextSkeleton size="sm"></TextSkeleton>
                <TextSkeleton></TextSkeleton>
                <TextSkeleton size="sm"></TextSkeleton>
                <TextSkeleton size="sm"></TextSkeleton>
                <TextSkeleton></TextSkeleton>
              </div>
            </div>
          }
        >
          <CategoriesList />
        </Suspense>
      </div>
      <div className="lg:w-4/5">
        <Suspense
          key={key}
          fallback={
            <MenuCardLayout>
              <CardSkeleton></CardSkeleton>
              <CardSkeleton></CardSkeleton>
              <CardSkeleton></CardSkeleton>
              <CardSkeleton></CardSkeleton>
              <CardSkeleton></CardSkeleton>
              <CardSkeleton></CardSkeleton>
            </MenuCardLayout>
          }
        >
          <MenusList query={modifiedQuery} />
        </Suspense>
      </div>
    </div>
  );
};

export default MenusPage;
