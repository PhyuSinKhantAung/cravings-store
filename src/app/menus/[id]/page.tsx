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

const SingleMenuPage = async ({ params }: { params: { id: number } }) => {
  const menu = await getSingleMenuById(Number(params.id));

  return (
    <>{menu ? <SingleMenu menu={menu} /> : <p>Item is not avaliable</p>}</>
  );
};

export default SingleMenuPage;
