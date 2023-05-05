import React, { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

// ======= private route ======= //
const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
    return Cookies.get('access_token_client') ? (
        <Suspense fallback={<div />}>
            <div><Element /></div>
        </Suspense>
    ) : (
        <Navigate to={"/"} />
    );
};

// ======= public route ======= //
    const PublicRoute: FC<{ element: any }> = ({element: Element}) => (
        <Suspense fallback={<div/>}>
            <Element/>
        </Suspense>
    );

// ======= pages ======= //
    const MainPage = React.lazy(() => import("app/main"));
    const UserPage = React.lazy(() => import("app/users"));
    const GptPage = React.lazy(() => import("app/gpt"));

    const AppRoutes = () => {
        return (
            <Routes>
                <Route path={"/app/users/*"} element={<PrivateRoute element={UserPage}/>}/>
                <Route path={"/app/*"} element={<PublicRoute element={MainPage}/>}/>
                <Route path={'/gpt/*'} element={<PublicRoute element={GptPage} />} />

                {/* DEFAULT */}
                <Route path='*' element={<Navigate to="/app"/>}/>
            </Routes>
        );
    };

export default AppRoutes;