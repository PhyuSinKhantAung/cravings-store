import React from "react";
import Image from "next/image";
import Link from "next/link";

export const bestSellerBurgers = [
  {
    url: "/best-seller-1.jpg",
    name: "American Cheese burger",
    price: 2,
  },
  {
    url: "/best-seller-2.jpg",
    name: "Beef Charco burger",
    price: 3.2,
  },
  {
    url: "/best-seller-3.jpg",
    name: "Stack Meat burger",
    price: 4,
  },
];

const HomePage = () => {
  return (
    <div>
      <div className=" max-w-full">
        <div className="lg:flex lg:my-10 my-5">
          <div className="py-5 lg:mr-20">
            <h1 className="prose font-bold text-7xl">
              Eat burger live happier
            </h1>
            <p className="py-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              fugit, maiores sint illo esse odit soluta voluptas doloremque
              pariatur minus velit illum ad dicta qui dignissimos! Similique
              deleniti debitis enim.
            </p>
            <Link href={`/menus`} role="button" className="btn btn-primary">
              View Menus
            </Link>
          </div>
          <div className="w-full lg:flex lg:justify-end">
            <Image
              src={"/burger-hero.jpg"}
              width={400}
              height={400}
              alt="burger"
              className="rounded-3xl"
            ></Image>
          </div>
        </div>
      </div>

      <div className="my-14">
        <h2 className="text-2xl tracking-wider">Best Seller Menus</h2>
        <div className="w-20 h-1 bg-primary"></div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-4 mt-14 ">
          {bestSellerBurgers.map((item) => {
            return (
              <div className="card bg-base-100 shadow-xl" key={item.url}>
                <figure className="px-10 pt-10">
                  <Image
                    src={item.url}
                    width={600}
                    height={60}
                    alt="cheese-burger"
                    className="rounded-xl"
                  ></Image>
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{item.name}</h2>
                  <span>{item.price} $</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
