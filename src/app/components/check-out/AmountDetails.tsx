"use client";
import { useAppSelector } from "@/lib/redux/hooks";
import React from "react";

const AmountDetails = () => {
  const cart = useAppSelector((state) => state.cart);
  return (
    <div>
      {cart.items.length !== 0 && (
        <div className="bg-red-50 flex flex-col p-5 rounded-md text-sm gap-5 items-center">
          <span>Subtotal - {cart.totalAmount} $</span>
          <span>Delivery - 5 $</span>
          <span> Total Amount - {cart.totalAmount + 5} $</span>
        </div>
      )}
    </div>
  );
};

export default AmountDetails;
