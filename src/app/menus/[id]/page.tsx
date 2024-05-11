import prisma from "@/lib/prisma";
import React from "react";
import SingleMenu from "@/app/components/menus/SingleMenu";

export const getSingleMenuById = async (menuId: number) => {
  const menu = await prisma.menu.findUnique({
    where: {
      id: menuId,
    },
  });

  console.log({ menu });
  return menu;
};

const SingleMenuPage = async ({ params }: { params: { id: string } }) => {
  const menu = await getSingleMenuById(Number(params.id));

  return (
    <div>
      {menu ? <SingleMenu menu={menu} /> : <p>Item is not avaliable</p>}
    </div>
  );
};

export default SingleMenuPage;
