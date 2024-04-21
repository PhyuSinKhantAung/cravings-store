"use client";
import React, { useEffect, useTransition } from "react";
import Link from "next/link";
import { FieldErrors, UseFormRegister, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchemaType, signupSchema } from "@/app/validations/auth";
import { useFormState, useFormStatus } from "react-dom";

import { SignupState, signup } from "@/app/actions";
import toast, { Toaster } from "react-hot-toast";
import { redirect } from "next/navigation";
import { signIn } from "../../../../auth";
export interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
}

const SignupForm = () => {
  const {
    register,
    formState: { errors, isValid },
    getValues,
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    mode: "all",
  });
  const [state, formAction] = useFormState<SignupState, FormData>(signup, null);

  const [pending, startTransaction] = useTransition();

  useEffect(() => {
    if (!state) {
      return;
    }
    if (state.status === "error") {
      toast.error(`${state.message}`);
    }
    if (state.status === "success") {
      redirect("/");
    }
  }, [state]);

  return (
    <form
      action={(formData) => {
        startTransaction(async () => {
          if (isValid) {
            formAction(formData);
            await signIn("credentials", formData);
          }
          // if (state?.status === "success") {
          // }
        });
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <FormContent register={register} errors={errors}></FormContent>
    </form>
  );
};

export const FormContent = ({
  register,
  errors,
}: {
  register: UseFormRegister<SignupSchemaType>;
  errors: FieldErrors<SignUpFormValues>;
}) => {
  const { pending } = useFormStatus();

  return (
    <div className="card bg-base-100 shadow-xl lg:w-1/3 md:w-1/2 w-full absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <div className="card-title mx-auto mt-5">Create your account</div>

      <div className="card-body grid gap-y-8">
        <div>
          <input
            type="text"
            placeholder="Enter your username"
            className="input input-bordered w-full input-md"
            {...register("name")}
            required
          />
          <span className="text-red-600 text-sm p-1">
            {errors?.name?.message}
          </span>
        </div>
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full input-md"
            {...register("email")}
            required
          />
          <span className="text-red-600 text-sm p-1">
            {errors?.email?.message}
          </span>
        </div>

        <div>
          <input
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full input-md"
            {...register("password")}
            required
          />
          <span className="text-red-600 text-sm p-1">
            {errors?.password?.message}
          </span>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Sign up
          {pending && <span className="loading loading-ring loading-sm"></span>}
        </button>
        <div className="flex justify-center gap-x-2 text-sm">
          <span>Already had an account?</span>
          <Link className="text-blue-600 underline" href={`/login`}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
