import React from "react";

const loading = () => {
  return (
    <div className="relative h-screen">
      <span className="loading loading-ring loading-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary"></span>
    </div>
  );
};

export default loading;
