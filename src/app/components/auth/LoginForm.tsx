"use client";
import React, { useEffect, useTransition } from "react";
import Link from "next/link";
import { FieldErrors, UseFormRegister, useForm } from "react-hook-form";
import { LoginSchemaType, loginSchema } from "@/app/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/actions";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const LoginForm = () => {
  const {
    register,
    formState: { errors, isValid },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  const [state, formAction] = useFormState(authenticate, undefined);

  const [pending, startTransaction] = useTransition();

  const { data: session, status } = useSession();
  console.log({ user: session?.user });

  useEffect(() => {
    console.log({ state }, "heyyyyyyy");
    if (!state) {
      return;
    }
    if (state.status === "error") {
      toast.error(`${state.message}`);
    }

    if (session?.user) {
      redirect("/");
    }
    if (state.status === "success") {
      console.log("pls redirect");
      redirect("/");
    }
  }, [state, session]);

  return (
    <form
      action={(formData) => {
        startTransaction(async () => {
          if (isValid) {
            formAction(formData);
          }
        });
      }}
    >
      <FormContent register={register} errors={errors}></FormContent>
    </form>
  );
};

export const FormContent = ({
  register,
  errors,
}: {
  register: UseFormRegister<LoginSchemaType>;
  errors: FieldErrors<LoginSchemaType>;
}) => {
  const { pending } = useFormStatus();

  return (
    <div className="card bg-base-100 shadow-xl lg:w-1/3 md:w-1/2 w-full absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <div className="card-title mx-auto mt-5">Login</div>

      <div className="card-body grid gap-y-8">
        <div>
          <span className="text-red-600 text-sm p-1">
            {errors?.email?.message}
          </span>
          <input
            type="text"
            placeholder="Enter your email"
            className="input input-bordered w-full input-md"
            required
            {...register("email")}
          />
        </div>
        <div>
          <span className="text-red-600 text-sm p-1">
            {errors?.password?.message}
          </span>
          <input
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full input-md"
            required
            {...register("password")}
          />
        </div>
        <div className="grid gap-y-4">
          <button className="btn btn-primary w-full" type="submit">
            Log in
            {pending && (
              <span className="loading loading-ring loading-sm"></span>
            )}
          </button>
          <button className="btn btn-neutral w-full">Guest user</button>
        </div>
        <div className="flex justify-center gap-x-2 text-sm">
          <span>Not a member yet?</span>
          <Link className="text-blue-600 underline" href={`/signup`}>
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
