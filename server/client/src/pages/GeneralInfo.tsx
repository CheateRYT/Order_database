
import  { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";

const GeneralInfo = () => {
    interface Info {
        averageExecutionTime: number;
        totalCompletedOrders: number;
    }

    const [executorInfo, setExecutorInfo] = useState<Info>({ averageExecutionTime: 0, totalCompletedOrders: 0 });
    const [loading, setLoading] = useState(true);
    const token = Cookies.get('token');

    useEffect(() => {
        const fetchExecutorInfo = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/orders/info', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setExecutorInfo(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching executor information:', error);
                setLoading(false);
            }
        };
        fetchExecutorInfo();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Основная информация о базе заявок</h1>
            {loading ? (
                <p>Загрузка информации...</p>
            ) : (
                executorInfo && (
                    <div>
                        <p><strong>Среднее время выполнения в
                            часах:</strong> {(executorInfo.averageExecutionTime / 1000 / 60 / 60).toFixed(2)} часов</p>
                        <p><strong>Среднее время выполнения в
                            минутах:</strong> {(executorInfo.averageExecutionTime / 1000 / 60).toFixed(2)} минут</p>

                        <p><strong>Количество выполненных заказов:</strong> {executorInfo.totalCompletedOrders}</p>
                    </div>
                )
            )}
        </div>
    );
};

export default GeneralInfo;