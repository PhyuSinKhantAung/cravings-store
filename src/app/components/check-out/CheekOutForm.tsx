"use client";
import {
  CheckOutSchemaType,
  checkoutSchema,
} from "@/app/validations/check-out";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useFormStatus } from "react-dom";
import { FieldErrors, UseFormRegister, useForm } from "react-hook-form";
import AmountDetails from "./AmountDetails";

const CheekOutForm = () => {
  const {
    register,
    formState: { errors, isValid },
  } = useForm<CheckOutSchemaType>({
    resolver: zodResolver(checkoutSchema),
    mode: "all",
  });
  return (
    <form className="md:flex items-end md:gap-x-4 md:max-w-6xl md:mx-auto my-6">
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
