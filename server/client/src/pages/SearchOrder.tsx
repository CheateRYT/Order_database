import { useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {Order} from "@prisma/client";

const SearchOrder = () => {
    const idRef = useRef<HTMLInputElement>(null);
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const token = Cookies.get('token');
    const handleSearchBtn = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8000/api/orders/${idRef.current?.value}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            setOrder(response.data);
            setLoading(false);
        } catch (error) {
            setError("Произошла ошибка при поиске заказа - " + error);
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Поиск заявки</h1>
            <input ref={idRef} type="text" placeholder={"Введите ID заявки"} />
            <button onClick={handleSearchBtn}>Найти</button>
            <div className={"Order"}>
                {loading ? (
                    <p>Загрузка...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : order ? (
                    <div className="card mb-3">
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
                ) : null}
            </div>
        </div>
    );
};

export default SearchOrder;