import React from "react";
import { Login } from "../../core/auth/application/Login";

const index = () => {

  return (
    <div style={{
      height: "100vh",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Login />
    </div>
  );
};

export default index;
