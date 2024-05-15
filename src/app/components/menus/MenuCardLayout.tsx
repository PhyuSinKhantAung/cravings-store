import React from "react";

const MenuCardLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="grid gap-2 lg:grid-cols-3 lg:gap-5 md:grid-cols-2">
      {children}
    </div>
  );
};

export default MenuCardLayout;
