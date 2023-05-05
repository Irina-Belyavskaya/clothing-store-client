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
const CategoriesPage = React.lazy(() => import("app/categories"));
const ProductsPage = React.lazy(() => import("app/products/products-view.page"));

const ProdctRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Suspended element={ProductsPage} />} />
      <Route path={"/categories/*"} element={<Suspended element={CategoriesPage} />} />

      {/* DEFAULT */}
      <Route path='*' element={<Navigate to="/" />} />
    </Routes>
  );
};

export default ProdctRoutes;
