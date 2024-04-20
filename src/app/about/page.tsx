import React from "react";

const AboutPage = () => {
  return (
    <div className="w-full lg:w-1/2 mx-auto flex flex-col items-center justify-center text-center  lg:p-5 my-20">
      <h1 className=" text-4xl font-semibold py-3 prose">
        We offer people nutrients
      </h1>
      <p className="py-3 text-accent">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore
        consequuntur iste autem ut at incidunt nisi reprehenderit? Delectus,
        expedita repellat illo cumque quo, omnis.
      </p>
      <ul className=" list-disc text-accent">
        <li>Lorem ipsum </li>
        <li>Coluptatibus</li>
        <li>Quasi animi </li>
      </ul>
    </div>
  );
};

export default AboutPage;
