"use client";
import { addItemToCart } from "@/lib/redux/features/cart/cart.slice";
import {
  decrement,
  increment,
} from "@/lib/redux/features/counter/counter.slice";
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/redux/hooks";
import { Menu } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

const SingleMenu = ({ menu }: { menu: Menu }) => {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => {
    return state.counter.value;
  });

  const [itemNote, setItemNote] = useState("");

  const addToCartHandler = () => {
    const cartItem = {
      id: menu.id,
      title: menu.title,
      price: menu.price,
      note: itemNote,
      quantity: count,
      image: menu.image,
    };

    dispatch(addItemToCart(cartItem));

    toast.success("Menu is added");
  };

  return (
    <div className="w-full my-10 lg:my-20 lg:flex max-w-6xl lg:justify-center lg:mx-auto md:gap-10">
      <div className="lg:w-3/5 pb-10">
        <Image
          src={`${menu?.image}`}
          width={600}
          height={400}
          alt={""}
          className="rounded-2xl lg:mx-auto"
        ></Image>
      </div>
      <div className="lg:w-2/5 flex flex-col ">
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
          onChange={(e) => {
            setItemNote(e.target.value);
          }}
        />
        <div className="join py-8">
          <button
            onClick={() => {
              dispatch(decrement());
            }}
            className="join-item btn"
          >
            -
          </button>
          <span className="join-item flex justify-center items-center p-2 px-6">
            {count}
          </span>
          <button
            onClick={() => {
              dispatch(increment());
            }}
            className="join-item btn"
          >
            +
          </button>
        </div>
        <div>
          <button onClick={addToCartHandler} className="btn btn-primary w-full">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleMenu;
