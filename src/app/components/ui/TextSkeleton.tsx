import React from "react";

const TextSkeleton = ({ size }: { size?: string | undefined }) => {
  return (
    <div
      className={`${
        size === "sm" ? "skeleton h-4 w-32" : "skeleton h-4 w-full"
      }`}
    ></div>
  );
};

export default TextSkeleton;
