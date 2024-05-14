import React from "react";
import { auth } from "@/auth";
import CheckOut from "../components/check-out/CheckOut";

const CheckoutPage = async () => {
  const session = await auth();

  return (
    <div>
      <CheckOut user={session?.user || null}></CheckOut>
    </div>
  );
};

export default CheckoutPage;
