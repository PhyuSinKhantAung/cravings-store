import SingleOrder from "@/app/components/orders/SingleOrder";
import prisma from "@/lib/prisma";
import React from "react";

export const getSingleOrderById = async (orderId: number) => {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  return order;
};

const page = async ({ params }: { params: { id: string } }) => {
  const order = await getSingleOrderById(Number(params.id));

  return (
    <div>
      {order ? (
        <SingleOrder order={order} />
      ) : (
        <p>There is no order with that id.</p>
      )}
    </div>
  );
};

export default page;
