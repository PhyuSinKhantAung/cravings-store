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
    <div>
      {data.map((menu: Menu) => (
        <MenuCard item={menu} key={menu.id} />
      ))}
    </div>
  );
};

export default MenusPage;
