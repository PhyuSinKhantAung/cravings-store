import prisma from "@/lib/prisma";
import generateTextColorByOrderStatus from "@/utils/generateTextColorByOrderStatus";
import React from "react";
import dayjs from "dayjs";

export const fetchOrders = async () => {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    data: orders,
    count: orders.length,
  };
};

const OrdersPage = async () => {
  const { data } = await fetchOrders();

  return (
    <div className="my-5 md:max-w-xl mx-auto">
      {data.map((item) => (
        <div
          className="card bg-base-100 shadow-lg hover:shadow-2xl mb-5 cursor-pointer"
          key={item.id}
        >
          <div className="card-body grid grid-cols-2 p-4 text-sm">
            <div className="flex flex-col gap-y-4">
              <span>Date</span>
              <span>Status</span>
              <span>Cost</span>
            </div>
            <div className="flex flex-col gap-y-4">
              <span>{dayjs(item.createdAt).format("MMMM D YYYY, h:mm A")}</span>
              <span
                className={`${generateTextColorByOrderStatus(item.status)}`}
              >
                {item.status}
              </span>
              <span>{item.cost} $</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
