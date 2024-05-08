import React from "react";

const Tabs = ({ children }: React.PropsWithChildren) => {
  return (
    <div role="tablist" className="tabs hidden lg:block">
      {children}
    </div>
  );
};

export default Tabs;
