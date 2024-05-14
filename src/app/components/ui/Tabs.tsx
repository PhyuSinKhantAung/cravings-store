import React from "react";

const Tabs = ({ children }: React.PropsWithChildren) => {
  return (
    <div role="tablist" className="tabs">
      {children}
    </div>
  );
};

export default Tabs;
