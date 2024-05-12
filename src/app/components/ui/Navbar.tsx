"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import checkAuthPage from "@/utils/checkAuthPage";
import { User } from "next-auth";
import { useAppSelector } from "@/lib/redux/hooks";

const homeLinks = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/menus", label: "menus" },
  { href: "/cart", label: "cart" },
];

const additionalLinks = [
  { href: "/check-out", label: "checkout" },
  { href: "/orders", label: "orders" },
];

const Navbar = ({ user }: { user: User | null }) => {
  const pathname = usePathname();

  const cartQuantityCount = useAppSelector((state) => state.cart.totalQuantity);

  if (checkAuthPage(pathname)) {
    return null;
  } else
    return (
      <div className="navbar bg-primary px-4 lg:px-10 xl:px-20">
        <div className="navbar-start text-secondary">
          <div className="dropdown">
            <div tabIndex={0} className="lg:hidden btn btn-ghost" role="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-menu"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 text-neutral rounded-box w-52"
            >
              {homeLinks.map((link) => {
                return (
                  <li
                    key={link.href}
                    className={`${
                      link.href === pathname && "text-primary font-semibold"
                    }`}
                  >
                    <Link href={link.href} className=" capitalize">
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              {user &&
                additionalLinks.map((link) => {
                  return (
                    <li
                      key={link.href}
                      className={`${
                        link.href === pathname && "text-secondary font-semibold"
                      }`}
                    >
                      <Link href={link.href} className=" capitalize">
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
          <Image
            src="/burger-logo.png"
            alt="burger-logo"
            width={60}
            height={60}
            className="hidden lg:flex"
          />
        </div>

        <div className="navbar-center text-white hidden lg:flex">
          <ul className="menu menu-horizontal md:ml-8">
            {homeLinks.map((link) => {
              return (
                <li
                  key={link.href}
                  className={`${
                    link.href === pathname && "text-secondary font-semibold"
                  }`}
                >
                  <Link href={link.href} className=" capitalize">
                    {link.label}
                  </Link>
                </li>
              );
            })}
            {user &&
              additionalLinks.map((link) => {
                return (
                  <li
                    key={link.href}
                    className={`${
                      link.href === pathname && "text-secondary font-semibold"
                    }`}
                  >
                    <Link href={link.href} className=" capitalize">
                      {link.label}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>

        <div className="navbar-end text-secondary">
          <div className="relative">
            <Link href={"/cart"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shopping-cart relative"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>

              <div className="badge badge-accent p-1.5 badge-xs absolute -top-1 -right-2 font-semibold">
                {cartQuantityCount}
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
};

export default Navbar;
