"use client";
import {
  CheckOutSchemaType,
  checkoutSchema,
} from "@/app/validations/check-out";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useTransition } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { FieldErrors, UseFormRegister, useForm } from "react-hook-form";
import AmountDetails from "./AmountDetails";
import { placeOrder } from "@/app/actions";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { User } from "next-auth";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { removeAllItems } from "@/lib/redux/features/cart/cart.slice";

const CheekOutForm = ({ user }: { user: null | User }) => {
  const {
    register,
    formState: { errors, isValid },
  } = useForm<CheckOutSchemaType>({
    resolver: zodResolver(checkoutSchema),
    mode: "all",
  });
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const [state, formAction] = useFormState(placeOrder, undefined);

  const [pending, startTransaction] = useTransition();

  useEffect(() => {
    if (!state) {
      return;
    }
    if (state.status === "success") {
      toast.success("Created orders successfully");

      dispatch(removeAllItems());

      localStorage.removeItem("reduxState");

      redirect("/orders");
    }
    if (state.status === "error") {
      toast.error(`${state.message}`);
    }
  }, [dispatch, state]);
  return (
    <form
      action={(formData) => {
        startTransaction(async () => {
          if (isValid) {
            formData.append("userId", user?.id?.toString()!);
            formData.append("quantity", cart.totalQuantity.toString());
            formData.append("cost", cart.totalAmount.toString());
            formAction(formData);
          }
        });
      }}
      className="md:flex items-end md:gap-x-4 md:max-w-6xl md:mx-auto my-6"
    >
      <div className="md:w-1/2">
        <FormContent register={register} errors={errors}></FormContent>
      </div>

      <div className="md:w-1/2 my-3 md:my-0">
        <AmountDetails />
      </div>
    </form>
  );
};

export const FormContent = ({
  register,
  errors,
}: {
  register: UseFormRegister<CheckOutSchemaType>;
  errors: FieldErrors<CheckOutSchemaType>;
}) => {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col gap-y-4">
      <h6>Delivery Information</h6>

      <div>
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full input-md"
          required
          {...register("name")}
        />
        <span className="text-red-600 text-sm p-1">
          {errors?.name?.message}
        </span>
      </div>
      <div>
        <input
          type="text"
          placeholder="Address"
          className="input input-bordered w-full input-md"
          required
          {...register("address")}
        />
        <span className="text-red-600 text-sm p-1">
          {errors?.address?.message}
        </span>
      </div>
      <div>
        <button className="btn btn-primary w-full" type="submit">
          Place your order
          {pending && <span className="loading loading-ring loading-sm"></span>}
        </button>
      </div>
    </div>
  );
};

export default CheekOutForm;
