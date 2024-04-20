"use client";
import React from "react";
import Link from "next/link";
import { FieldErrors, UseFormRegister, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/app/validations/auth";
import { useFormState, useFormStatus } from "react-dom";

import { SignupState, signup } from "@/app/actions";

export interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
}

const SignupForm = () => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signupSchema),
  });
  const [state, formAction] = useFormState<SignupState, FormData>(signup, null);

  console.log({ state, name: getValues("name") });

  return (
    <form
      action={async (formData) => {
        try {
          await formAction(formData);
        } catch (error) {
          console.log("here error");
          alert(error);
        }
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
  register: UseFormRegister<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
}) => {
  const { pending } = useFormStatus();

  console.log({ errors, register });
  return (
    <div className="card bg-base-100 shadow-xl lg:w-1/3 md:w-1/2 w-full absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <div className="card-title mx-auto mt-5">Create your account</div>

      <div className="card-body grid gap-y-8">
        <input
          type="text"
          placeholder="Enter your username"
          className="input input-bordered w-full input-md"
          {...register("name")}
        />
        <input
          type="text"
          placeholder="Enter your email"
          className="input input-bordered w-full input-md"
          {...register("email")}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="input input-bordered w-full input-md"
          {...register("password")}
        />
        <button type="submit" className="btn btn-primary w-full">
          Sign up
        </button>
        <div className="flex justify-center gap-x-2 text-sm">
          <span>Already had an account?</span>
          <Link className="text-blue-600 underline" href={`/login`}>
            Login
          </Link>
        </div>
        {pending && <span> Loading...</span>}
      </div>
    </div>
  );
};

export default SignupForm;
