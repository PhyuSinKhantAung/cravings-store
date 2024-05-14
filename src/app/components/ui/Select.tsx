import React from "react";

type Props = {
  children: React.ReactNode;
  label: string;
  onChange: any;
};

const Select = ({ children, label, onChange }: Props) => {
  return (
    <select className="select bg-neutral-200  max-w-sm" onChange={onChange}>
      <option disabled selected className="hidden">
        {label}
      </option>
      {children}
    </select>
  );
};

export default Select;
