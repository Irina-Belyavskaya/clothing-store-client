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
const CategoriesPage = React.lazy(() => import("app/categories/categories-view.page"));

const ProdctRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/:categoryId"} element={<Suspended element={CategoriesPage} />} />

      {/* DEFAULT */}
      <Route path='*' element={<Navigate to="/" />} />
    </Routes>
  );
};

export default ProdctRoutes;
