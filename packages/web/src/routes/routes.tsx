import React, { Suspense } from "react";
import { HomeRoute } from "./home/home";

export const Router = () => {
  return (
    <Suspense fallback={<div>Suspended</div>}>
      <HomeRoute />
    </Suspense>
  );
};
