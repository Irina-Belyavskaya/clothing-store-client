import React, { FC, PropsWithChildren, Suspense } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

const Suspended: FC<PropsWithChildren & { element: any }> = ({
                                                                 element: Element,
                                                             }) => {
    return (
        <Suspense fallback={<div />}>
            <Element />
        </Suspense>
    );
};

// ======= pages ======= //
const GptChatPage = React.lazy(() => import('app/gpt/gpt-chat.page'));

const CartRoutes: FC = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Suspended element={GptChatPage} />} />

            {/* DEFAULT */}
            <Route path="*" element={<Navigate to="/gpt" />} />
        </Routes>
    );
};

export default CartRoutes;