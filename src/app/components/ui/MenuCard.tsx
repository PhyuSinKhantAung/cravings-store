import { Menu } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MenuCard = ({ item }: { item: Menu }) => {
  return (
    <Link href={`/menus/${item.id}`}>
      <div className="card bg-base-100 shadow-xl" key={item.id}>
        <figure className="px-10 pt-10">
          <Image
            src={item.image}
            width={600}
            height={60}
            alt="burger"
            className="rounded-xl"
          ></Image>
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{item.title}</h2>
          <span>{item.price} $</span>
        </div>
      </div>
    </Link>
  );
};

export default MenuCard;
