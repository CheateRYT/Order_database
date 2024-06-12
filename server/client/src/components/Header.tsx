import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { tokenStore } from "../store/tokenStore.tsx";
import { userStore } from "../store/userStore.ts";
import { io } from "socket.io-client";
import { User } from "@prisma/client";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
    const user = userStore((state) => state.user as User);
    const navigate = useNavigate();

    useEffect(() => {
        var socket = io('http://localhost:3000', { transports: ['websocket'] });
        socket.on("UpdateYourOrder", (data) => {
            if (data.clientId === user.id) {
                toast.info(data.message, { position: "bottom-right", autoClose: 5000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true });
            }
        });
        socket.on("NewOrder", (data) => {

                toast.info(data.message, { position: "bottom-right", autoClose: 5000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true });

        });
        socket.on("CompletedYourOrder", (data) => {
            if (data.clientId === user.id) {
                toast.info(data.message, { position: "bottom-right", autoClose: 5000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true });
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [user.id]);

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    const handleLogoutBtn = () => {
        Cookies.remove('token');
        tokenStore.setState({ token: "" });
        userStore.setState({ user: {} });
        navigate("/");
    };

    return (
        <div className={"Layout"}>
            <ToastContainer />
            <header className="d-flex justify-content-between align-items-center bg-dark text-white p-3">
                <h2 className="m-0">База заявок</h2>
                <div className="d-flex gap-2">
                    <a href="#" className="text-white" onClick={() => handleNavigate('/main')}>Главная</a>
                    <a href="#" className="text-white" onClick={() => handleNavigate('/main/profile')}>Личный кабинет</a>
                    <a href="#" className="text-white" onClick={() => handleNavigate('/main/notifications')}>Уведомления</a>
                    <a href="#" className="text-white" onClick={() => handleNavigate('/main/general-info')}>Общая информация</a>
                    <a href="#" className="text-white" onClick={() => handleNavigate('/main/your-orders')}>Ваши заявки</a>
                    <a href="#" className="text-white" onClick={() => handleNavigate('/main/all-orders')}>Все заявки</a>
                    <a href="#" className="text-white" onClick={() => handleNavigate('/main/search-order')}>Поиск заявки</a>
                    <a href="#" className="text-white" onClick={handleLogoutBtn}>Выйти</a>
                </div>
            </header>
        </div>
    );
};

export default Header;