import { signOut } from "@/auth";
import React from "react";

const LogoutForm = () => {
  return (
    <form
      action={async () => {
        await signOut();
      }}
    >
      <button type="submit">Log Out</button>
    </form>
  );
};

export default LogoutForm;
