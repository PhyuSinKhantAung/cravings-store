"use client";
import { CartMenuItem } from "@/lib/redux/features/cart/cart.slice";
import { useAppSelector } from "@/lib/redux/hooks";
import Image from "next/image";
import React from "react";

const Cart = () => {
  const cart = useAppSelector((state) => state.cart);

  const { totalQuantity, totalAmount } = cart;

  console.log({ cartItems: cart.items });
  return (
    <div>
      {cart.items.map((item: CartMenuItem) => {
        return (
          <div>
            <Image alt="" width={600} height={400} src={item.image}></Image>
            <p>{item.title}</p>
            <span> item quantity - {item.quantity}</span>
            <span> Total Quantity - {totalQuantity}</span>
            <span> Total Amount - {totalAmount}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
