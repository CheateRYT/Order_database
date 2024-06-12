import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {Order} from "@prisma/client";

const AllOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const token = Cookies.get('token');
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/orders/",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                setOrders(response.data);
                setLoading(false);
            } catch (error) {
                setError("Произошла ошибка при загрузке заказов - " + error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <h1>Все заявки</h1>
            <div className="Orders">
                {loading ? (
                    <p>Загрузка...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    orders.map((order) => (
                        <div key={order.id} className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">ID заявки: {order.id}</h5>
                                <p className="card-text">Оборудование: {order.equipment}</p>
                                <p className="card-text">Тип неисправности: {order.faultType}</p>
                                <p className="card-text">Описание проблемы: {order.problemDescription}</p>
                                <p className="card-text">ID клиента: {order.clientId}</p>
                                <p className="card-text">ID исполнителя: {order.executorId || 'Нет данных'}</p>
                                <p className="card-text">Комментарий исполнителя: {order.executorComment || 'Нет данных'}</p>
                                <p className="card-text">Дата добавления: {new Date(order.dateAdded).toLocaleString()}</p>
                                <p className="card-text">Дата принятия: {order.dateAccepted ? new Date(order.dateAccepted).toLocaleString() : 'Не принят'}</p>
                                <p className="card-text">Дата завершения: {order.dateCompleted ? new Date(order.dateCompleted).toLocaleString() : 'Не завершен'}</p>
                                <p className="card-text">Статус: {order.status}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AllOrders;