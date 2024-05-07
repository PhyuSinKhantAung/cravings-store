"use server";
import prisma from "@/lib/prisma";

import { Menu } from "@prisma/client";
import React from "react";
import MenuCard from "../components/ui/MenuCard";

export async function fetchMenus() {
  const menus = await prisma.menu.findMany({});

  return {
    data: menus,
  };
}
const MenusPage = async () => {
  const { data } = await fetchMenus();
  return (
    <div className="container mx-auto my-5">
      <div className="grid gap-2 lg:grid-cols-3 lg:gap-5 md:grid-cols-2">
        {data.map((menu: Menu) => (
          <MenuCard item={menu} key={menu.id} />
        ))}
      </div>
    </div>
  );
};

export default MenusPage;
