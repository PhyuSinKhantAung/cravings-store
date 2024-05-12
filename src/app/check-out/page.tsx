import React from "react";
import CheckOutForm from "@/app/components/check-out/CheckOutForm";
import { auth } from "@/auth";

const CheckoutPage = async () => {
  const session = await auth();

  return (
    <div>
      <div className="my-4 mt-8 lg:max-w-6xl lg:mx-auto">
        <h1 className="text-2xl text-accent">Place Your Order!</h1>
        <div className="w-12 h-1 bg-accent"></div>
      </div>
      <CheckOutForm user={session?.user ?? null}></CheckOutForm>
    </div>
  );
};

export default CheckoutPage;
