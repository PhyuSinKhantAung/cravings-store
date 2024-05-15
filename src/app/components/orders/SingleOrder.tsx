import React from "react";
import Card from "../ui/Card";
import { Order } from "@prisma/client";
import dayjs from "dayjs";
import generateTextColorByOrderStatus from "@/utils/generateTextColorByOrderStatus";
import Link from "next/link";

const SingleOrder = ({ order }: { order: Order }) => {
  return (
    <div className="my-5 md:max-w-xl mx-auto">
      <div className="my-8">
        <h1 className="text-4xl text-prose font-semibold">Trace your order</h1>
        <div className="w-12 h-1 bg-accent"></div>
      </div>

      <Card>
        <h6 className="text-lg italic text-neutral">Order Details</h6>

        <div className="my-5 flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="" className=" font-semibold">
              Date
            </label>
            <span>{dayjs(order.createdAt).format("MMMM D YYYY, h:mm A")}</span>
          </div>

          <div className="flex flex-col">
            <label htmlFor="" className=" font-semibold">
              Name
            </label>
            <span>{order.name}</span>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className=" font-semibold">
              Delivery Address
            </label>
            <span>{order.address}</span>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className=" font-semibold">
              Status
            </label>
            <span className={`${generateTextColorByOrderStatus(order.status)}`}>
              {order.status}
            </span>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className=" font-semibold">
              Total Cost
            </label>
            <span>{order.cost} $</span>
          </div>
        </div>
      </Card>

      <div>
        <Link href={"/orders"}>
          <button className="btn btn-primary">Back</button>
        </Link>

        <span className="ml-5">
          Need help?{" "}
          <Link href="/" className="underline text-blue-600">
            Contact us
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SingleOrder;
