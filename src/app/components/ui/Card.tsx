import React from "react";

const Card = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-2xl mb-5 cursor-pointer">
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;
