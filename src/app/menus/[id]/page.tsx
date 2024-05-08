import MenuCard from "@/app/components/ui/MenuCard";
import prisma from "@/lib/prisma";
import React from "react";
import Image from "next/image";
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
    <div className="w-full my-6 lg:flex max-w-4xl lg:justify-between">
      <div className="lg:w-3/4 pb-10">
        <Image
          src={`${menu?.image}`}
          width={600}
          height={400}
          alt={""}
          className="rounded-2xl"
        ></Image>
      </div>
      <div className="lg:w-1/4 flex flex-col">
        <div className="flex items-end justify-between">
          <h1 className="text-4xl font-semibold prose">{menu?.title}</h1>
          <span className="font-bold">Price - {menu?.price} $</span>
        </div>
        <p className="py-8 text-accent">{menu?.description}</p>
        <label htmlFor="" className="italic">
          Note to restaurant (optional)
        </label>
        <input
          type="text"
          placeholder="Add your request"
          className="py-2 px-1 border-b border-b-prose focus:outline-none"
        />
        <div className="join py-10">
          <button className="join-item btn">-</button>
          <span className="join-item flex justify-center items-center p-2 px-6">
            1
          </span>
          <button className="join-item btn">+</button>
        </div>
        <div>
          <button className="btn btn-primary w-full">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default SingleMenuPage;
