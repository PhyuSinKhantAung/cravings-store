"use client";
import {
  CartMenuItem,
  addItemToCart,
  removeItemFromCart,
} from "@/lib/redux/features/cart/cart.slice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AmountDetails from "../check-out/AmountDetails";
import { redirect } from "next/navigation";

export const persistedState =
  typeof window !== "undefined" && localStorage.getItem("reduxState")!
    ? JSON.parse(localStorage.getItem("reduxState")!)
    : null;

const Cart = () => {
  const cart = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  return (
    <div className="my-5 xl:container xl:mx-auto xl:px-10 px-2">
      <div className="my-8">
        <h1 className="text-4xl text-prose font-semibold">Your Cart</h1>
        <div className="w-12 h-1 bg-accent"></div>
      </div>

      {cart.items.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-6 my-40">
          <Image src={"/empty.svg"} width={200} height={200} alt=""></Image>
          <span className="text-center">Your Cart is empty now.</span>
        </div>
      ) : (
        <>
          {cart.items.map((item: CartMenuItem) => {
            return (
              <div className="mb-4" key={item.id}>
                <div className="grid grid-cols-3 items-center gap-x-4">
                  <div>
                    <Image
                      alt=""
                      width={200}
                      height={200}
                      src={item.image}
                      className="rounded-xl w-40 h-30"
                    ></Image>
                  </div>
                  <div className="">
                    <h6 className="prose font-semibold">{item.title}</h6>
                    <small className="block text-xs font-semibold py-2">
                      {item.price} $
                    </small>
                    {item.note && (
                      <small className="text-accent italic text-xs">
                        Note: {item?.note}
                      </small>
                    )}
                  </div>
                  <div className="mx-10">
                    <div className="join">
                      <button
                        onClick={() => {
                          dispatch(removeItemFromCart(item));
                        }}
                        className="join-item btn btn-xs"
                      >
                        -
                      </button>
                      <span className="join-item px-2 block">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          dispatch(addItemToCart(item));
                        }}
                        className="join-item btn btn-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <AmountDetails />

          <Link href={`/check-out`}>
            <button className="btn btn-primary w-full my-4">Check Out</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;
