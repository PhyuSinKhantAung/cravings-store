import prisma from "@/lib/prisma";
import generateTextColorByOrderStatus from "@/utils/generateTextColorByOrderStatus";
import React from "react";
import dayjs from "dayjs";
import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import Card from "../components/ui/Card";

export const fetchOrders = async (query: { userId: number }) => {
  const orders = await prisma.order.findMany({
    where: {
      userId: query.userId,
    },
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
  const session = await auth();
  const userId = session?.user?.id!;
  const { data } = await fetchOrders({ userId: Number(userId) });

  return (
    <div className="my-5 md:max-w-xl mx-auto">
      <div className="my-8">
        <h1 className="text-4xl text-prose font-semibold">Orders</h1>
        <div className="w-12 h-1 bg-accent"></div>
      </div>

      {data.map((item) => (
        <Link key={item.id} href={`/orders/${item.id}`}>
          <Card>
            <div className="grid grid-cols-2 text-sm">
              <div className="flex flex-col gap-y-4">
                <span>Date</span>
                <span>Status</span>
                <span>Cost</span>
              </div>
              <div className="flex flex-col gap-y-4">
                <span>
                  {dayjs(item.createdAt).format("MMMM D YYYY, h:mm A")}
                </span>
                <span
                  className={`${generateTextColorByOrderStatus(item.status)}`}
                >
                  {item.status}
                </span>
                <span>{item.cost} $</span>
              </div>
            </div>
          </Card>
        </Link>
      ))}

      {data.length === 0 && (
        <div className="flex flex-col justify-center items-center gap-6 my-40">
          <Image src="/empty-data.svg" width={200} height={200} alt=""></Image>
          <span>You have not ordered yet.</span>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
