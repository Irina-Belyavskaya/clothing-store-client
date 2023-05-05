import React, { FC, PropsWithChildren, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

const Suspended: FC<PropsWithChildren & { element: any }> = ({ element: Element }) => {
  return (
    <Suspense fallback={<div />}>
      <Element />
    </Suspense>
  );
};

// ======= pages ======= //
const AuthPage = React.lazy(() => import("app/auth"));
const ProductPage = React.lazy(() => import("app/products"));
const MainPage = React.lazy(() => import("app/main/main-view.page"));

const MainRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/auth/*"} element={<Suspended element={AuthPage} />} />
      <Route path={"/products/*"} element={<Suspended element={ProductPage} />} />
      <Route path={"/"} element={<Suspended element={MainPage} />} />


      {/* DEFAULT */}
      <Route path='*' element={<Navigate to="/" />} />
    </Routes>
  );
};

export default MainRoutes;