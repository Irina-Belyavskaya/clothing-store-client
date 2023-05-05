// const UsersRoutes: FC = () => {
//     return (
//         <Routes>
//             <Route path='/users' element={<UserPage/>}></Route>
//             <Route path='/users/orders' element={<UserOrdersPage/>}/>
//             <Route path='/users/carts' element={<UserCartPage/>}/>
//         </Routes>
//     );
// };
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
const UserPage = React.lazy(() => import("app/users/user.page"));
const UserOrderPage = React.lazy(() => import("app/orders/user-orders.page"));
const UserCartPage = React.lazy(() => import("app/carts/user-cart.page"));
const UserSettingsPage = React.lazy(() => import("app/settings/user-settings.page"));

const UsersRoutes: FC = () => {
    return (
        <Routes>

            <Route path={"/orders"} element={<Suspended element={UserOrderPage} />} />
            <Route path={"/carts"} element={<Suspended element={UserCartPage} />} />
            <Route path={"/settings"} element={<Suspended element={UserSettingsPage} />} />
            <Route path={"/"} element={<Suspended element={UserPage} />} />

            {/* DEFAULT */}
            <Route path='*' element={<Navigate to="/" />} />
        </Routes>
    );
};

export default UsersRoutes;
