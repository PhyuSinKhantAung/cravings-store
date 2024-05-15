import React from "react";
import prisma from "@/lib/prisma";
import { Menu, Prisma } from "@prisma/client";
import MenuCard from "../ui/MenuCard";
import Pagination from "../ui/Pagination";
import MenuCardLayout from "./MenuCardLayout";

type GetMenuQuery = {
  page?: string | undefined;
  limit?: string | undefined;
  search?: string | undefined;
  category?: number | undefined;
};

export async function fetchMenus(rawQuery: GetMenuQuery) {
  const page = Number(rawQuery?.page) || 1;
  const limit = Number(rawQuery?.limit) || 10;
  const skip = page > 0 ? limit * (page - 1) : 0;

  const query: Prisma.MenuFindManyArgs = {
    where: {
      title: {
        contains: rawQuery.search,
        mode: "insensitive",
      },
      ...(Number(rawQuery?.category)
        ? { categoryId: Number(rawQuery.category) }
        : {}),
    },
    take: limit,
    skip,
  };

  const [menus, count] = await Promise.all([
    prisma.menu.findMany(query),
    prisma.menu.count({ where: query.where }),
  ]);

  const pagination = {
    total: count,
    currentPage: page,
    prevPage: page - 1,
    nextPage: page + 1,
    limit,
  };

  return {
    data: menus,
    pagination,
  };
}

const MenusList = async ({ query }: { query: GetMenuQuery }) => {
  const { data, pagination } = await fetchMenus(query);

  return (
    <div>
      <MenuCardLayout>
        {data.map((menu: Menu) => (
          <MenuCard item={menu} key={menu.id} />
        ))}
      </MenuCardLayout>
      <div className="flex justify-center my-2">
        <Pagination data={pagination} />
      </div>
    </div>
  );
};

export default MenusList;
