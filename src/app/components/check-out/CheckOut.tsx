"use client";
import React from "react";
import CheckOutForm from "./CheckOutForm";
import { User } from "next-auth";
import { useAppSelector } from "@/lib/redux/hooks";

const CheckOut = ({ user }: { user: null | User }) => {
  const cart = useAppSelector((state) => state.cart);

  return (
    <div>
      {cart.items.length !== 0 && (
        <div>
          <div className="my-4 mt-8 lg:max-w-6xl lg:mx-auto">
            <h1 className="text-2xl text-accent">Place Your Order!</h1>
            <div className="w-12 h-1 bg-accent"></div>
          </div>
          <CheckOutForm user={user}></CheckOutForm>
        </div>
      )}
    </div>
  );
};

export default CheckOut;
