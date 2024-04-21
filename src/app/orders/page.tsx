"use client";
import { useSession } from "next-auth/react";
import React from "react";

const OrdersPage = () => {
  const { data: session } = useSession();
  console.log({ session });
  return (
    <div>
      orderspage
      <h1>{session?.user?.email}</h1>
    </div>
  );
};

export default OrdersPage;
