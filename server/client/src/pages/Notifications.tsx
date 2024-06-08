import { useState } from "react";
import { Notification } from "@prisma/client";// Assume you have an API function to fetch notifications
import axios from "axios";
import Cookies from "js-cookie";
const Notifications = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const token = Cookies.get('token');
    const handleGetNewNotifications = async () => {
        setLoading(true);
        try {

            const response = await axios.get("http://localhost:8000/api/orders/notifications/new", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setNotifications(response.data);
            setLoading(false);
        } catch (error) {
            setError("Произошла ошибка при получении уведомлений");
            setLoading(false);
        }
    };
    const handleGetCompletedNotifications = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8000/api/orders/notifications/completed", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setNotifications(response.data);
            setLoading(false);
        } catch (error) {
            setError("Произошла ошибка при получении уведомлений");
            setLoading(false);
        }
    };
    const handleGetUpdatesNotifications = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8000/api/orders/notifications/updates", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setNotifications(response.data);
            setLoading(false);
        } catch (error) {
            setError("Произошла ошибка при получении уведомлений");
            setLoading(false);
        }
    };
    const handleGetAllNotifications = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8000/api/orders/notifications", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setNotifications(response.data);
            setLoading(false);
        } catch (error) {
            setError("Произошла ошибка при получении уведомлений");
            setLoading(false);
        }
    };
    return (
        <div>
            <h1>Уведомления</h1>
            <button onClick={handleGetAllNotifications}>Посмотреть все уведомления</button>
            <button onClick={handleGetCompletedNotifications}>Посмотреть уведомления о ваших выполненых заявках</button>
            <button onClick={handleGetUpdatesNotifications}>Посмотреть уведомления об обновлениях заявок</button>
            <button onClick={handleGetNewNotifications}>Посмотреть уведомления о новых заявках</button>
            <div className="Notifications">
                {loading ? (
                    <p>Поиск уведомлений...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    notifications.map((notification) => (
                        <div key={notification.id} className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">{notification.type}</h5>
                                <p className="card-text">{notification.message}</p>
                                <p className="card-text">
                                    <small className="text-muted">{notification.createdAt.toString()}</small>
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
export default Notifications;