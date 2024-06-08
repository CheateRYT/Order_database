import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { tokenStore } from "../store/tokenStore.tsx";

const PrivateRouter = ({ Page }: { Page: React.ComponentType }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTokenFromCookies = () => {
            const tokenFromCookies = Cookies.get('token');
            if (tokenFromCookies) {
                tokenStore.setState({ token: tokenFromCookies });
                setLoading(false);
            } else {
                setLoading(false);
            }
            console.log(tokenFromCookies);
        };
        getTokenFromCookies();
    }, []);

    if (loading) {
        return <p>Загрузка...</p>;
    }

    return (
        tokenStore.getState().token !== "" ? <Page /> : <Navigate to="/login" />
    );
};

export default PrivateRouter;