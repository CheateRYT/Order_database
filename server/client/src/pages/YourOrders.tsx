import { useState } from "react";
import axios from "axios";
import { Order } from "@prisma/client";

const YourOrders = () => {
    const [orders, setOrders] = useState<Order[] | []>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGetMyOrders = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8000/api/myOrders");
            setOrders(response.data);
            setLoading(false);
        } catch (error) {
            setError("Произошла ошибка при загрузке ваших заказов");
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Ваши заявки</h1>
            <button onClick={handleGetMyOrders}>Посмотреть ваши заказы</button>
            <div className="Orders">
                {loading ? (
                    <p>Загрузка...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    orders.map((order) => (
                        <div key={order.id} className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">ID заказа: {order.id}</h5>
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

export default YourOrders;