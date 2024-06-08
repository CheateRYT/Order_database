import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRouter = ({ Page }: { Page: React.ComponentType }) => {
    const [token, setToken] = useState('');

    useEffect(() => {
        const getTokenFromCookies = () => {
            const tokenFromCookies = Cookies.get('token');
            if (tokenFromCookies) {
                setToken(tokenFromCookies);
            }
        };
        getTokenFromCookies();
    }, []);

    return (
        token != null ? <Page /> : <Navigate to="/login" />
    );
};

export default PrivateRouter;