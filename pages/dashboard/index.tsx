import React from "react";
import ApiMethods from "../../core/api-methods/application/ApiMethods";
import { ModuleLayout } from "../../layouts";


const index = () => {
  return (
    <>

      <ModuleLayout title="Api - Métodos" />
      <ApiMethods />
    </>
  );
};

export default index;
