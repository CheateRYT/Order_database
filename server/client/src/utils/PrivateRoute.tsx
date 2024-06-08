import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import {userStore} from "../store/userStore.ts";

const PrivateRouter = ({ Page }: { Page: React.ComponentType }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserFromServer = async () => {
            try {
                const token = Cookies.get('token');
                if (token) {
                    const response = await axios.get('http://localhost:8000/api/user/current', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    userStore.setState({ user: response.data });
                }
            } catch (error) {
                console.error("An error occurred while fetching the current user", error);
            } finally {
                setLoading(false);
            }
        };

        getUserFromServer();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (Object.keys(userStore.getState().user).length !== 0) {
        return <Page />;
    } else {
        return <Navigate to="/login" />;
    }
};

export default PrivateRouter;