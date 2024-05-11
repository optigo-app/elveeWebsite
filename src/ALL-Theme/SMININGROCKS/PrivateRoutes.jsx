import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({ isLoginStatus }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
            window.scrollTo(0, 0);
        }, 100);

        return () => clearTimeout(timeout);
    }, [isLoginStatus]);

    if (isLoading) {
        return <div></div>;
    }
    return isLoginStatus == 'true' ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;