"use client";
import { CartMenuItem } from "@/lib/redux/features/cart/cart.slice";
import { useAppSelector } from "@/lib/redux/hooks";
import Image from "next/image";
import React, { useEffect } from "react";

export const persistedState =
  typeof window !== "undefined" && localStorage.getItem("reduxState")!
    ? JSON.parse(localStorage.getItem("reduxState")!)
    : null;

const Cart = () => {
  const cart = useAppSelector((state) => state.cart);

  console.log({ cartItems: cart.items });

  return (
    <div className="my-5 xl:container xl:mx-auto xl:px-10 px-2">
      <div className="my-8">
        <h1 className="text-4xl text-prose font-semibold">Your Cart</h1>
        <div className="w-12 h-1 bg-accent"></div>
      </div>
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
                  {/* <div>Quantity</div> */}
                  <button
                    onClick={() => {
                      // dispatch(decrement());
                    }}
                    className="join-item btn btn-xs"
                  >
                    -
                  </button>
                  <span className="join-item px-2 block">{item.quantity}</span>
                  <button
                    onClick={() => {
                      // dispatch(increment());
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
      {cart.items.length !== 0 && (
        <div>
          <div className="bg-red-50 flex flex-col p-5 rounded-md text-sm gap-5 items-center">
            <span>Subtotal - {cart.totalAmount} $</span>
            <span>Delivery - 5 $</span>
            <span> Total Amount - {cart.totalAmount + 5} $</span>
          </div>
          <button className="btn btn-primary w-full my-4">Check out</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
