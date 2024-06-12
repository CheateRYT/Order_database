import Header from "../components/Header.tsx";
import { useRef } from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import {userStore} from "../store/userStore.ts";
import {User} from "@prisma/client";

const Main = () => {
    const equipmentRef = useRef<HTMLInputElement>(null);
    const faultTypeRef = useRef<HTMLInputElement>(null);
    const problemDescriptionRef = useRef<HTMLTextAreaElement>(null);
    const statusRef = useRef<HTMLSelectElement>(null);
    const executorCommentRef = useRef<HTMLTextAreaElement>(null);
    const executorIdRef = useRef<HTMLInputElement>(null);
    const updateOrderIdRef = useRef<HTMLInputElement>(null);
    const takeOrderIdRef = useRef<HTMLInputElement>(null)
    const takeOrderExecutorCommentRef = useRef<HTMLTextAreaElement>(null)
    const user = userStore((state) => state.user as User);

    const token = Cookies.get('token');
    const handleSubmitRequest = async () => {
        const equipment = equipmentRef.current!.value;
        const faultType = faultTypeRef.current!.value;
        const problemDescription = problemDescriptionRef.current!.value;
        try {
            const response = await axios.post("http://localhost:8000/api/orders/add", {
                equipment,
                faultType,
                problemDescription
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            alert("Ваша заявка отправлена");
        } catch (error  : any) {
            if (error.response) {
                alert(`Ошибка: ${error.response.data.message}`);
            } else {
                alert("Произошла ошибка при отправке заявки");
            }
            console.error(error);
        }
    };

    const handleTakeOrder = async () => {
        const executorComment = takeOrderExecutorCommentRef.current?.value;
        const updateOrderId = takeOrderIdRef.current!.value;
        try {
            const response = await axios.put(`http://localhost:8000/api/orders/update/${updateOrderId}`, {
                executorComment,
                status: "в работе",
                executorId: user.id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
        } catch (error  : any) {
            if (error.response) {
                alert(`Ошибка: ${error.response.data.message}`);
            } else {
                alert("Произошла ошибка при обновлении заявки");
            }
            console.error(error);
        }
    };

    const handleUpdateRequest = async () => {
        const status = statusRef.current!.value;
        const executorComment = executorCommentRef.current?.value;
        const executorId = executorIdRef.current?.value;
        const updateOrderId = updateOrderIdRef.current!.value;
        try {
            const response = await axios.put(`http://localhost:8000/api/orders/update/${updateOrderId}`, {
                status,
                executorComment,
                executorId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
        } catch (error : any) {
            if (error.response) {
                alert(`Ошибка: ${error.response.data.message}`);
            } else {
                alert("Произошла ошибка при обновлении заявки");
            }
            console.error(error);
        }
    };
    return (
        <div>
            <Header />
            <div className="container">
                <h1>Подать заявку</h1>
                <div>
                    <label>Оборудование</label>
                    <input type="text" className="form-control" ref={equipmentRef}/>
                </div>
                <div>
                    <label>Тип неисправности</label>
                    <input type="text" className="form-control" ref={faultTypeRef}/>
                </div>
                <div>
                    <label>Описание проблемы</label>
                    <textarea rows={3} className="form-control" ref={problemDescriptionRef}></textarea>
                </div>
                <button className="btn btn-primary mb-5" onClick={handleSubmitRequest}>Отправить</button>

                <h1>Стать исполнителем</h1>
                <div>
                    <label>ID заявки</label>
                    <input className={"form-control"} ref={takeOrderIdRef} type="number"/>
                </div>
                <div>
                    <label>Комментарий исполнителя</label>
                    <textarea rows={3} className="form-control" placeholder={"Оставьте пустым если не нужно"}
                              ref={takeOrderExecutorCommentRef}></textarea>
                </div>

                <button className="btn btn-primary mb-5" onClick={handleTakeOrder}>Подтвердить</button>

                <h1>Обновить заявку</h1>
                <div>
                    <label>ID заявки</label>
                    <input className={"form-control"} ref={updateOrderIdRef} type="number"/>
                </div>
                <div>
                    <label>Выберите Статус</label>
                    <select className="form-control" ref={statusRef}>
                        <option value={"без изменений"}>Без изменений</option>
                        <option value={"в работе"}>в работе</option>
                        <option value={"в ожидании"}>в ожидании</option>
                        <option value={"выполнено"}>выполнено</option>
                    </select>
                </div>
                <div>
                <label>Комментарий исполнителя</label>
                    <textarea rows={3} className="form-control" placeholder={"Оставьте пустым если не нужно"}
                              ref={executorCommentRef}></textarea>
                </div>
                <div>
                    <label>Новый ID исполнителя</label>
                    <input type="number" className="form-control" ref={executorIdRef}
                           placeholder={"Оставьте пустым если не нужно"}/>
                </div>
                <button className="btn btn-primary" onClick={handleUpdateRequest}>Обновить</button>
            </div>
        </div>
    );
};

export default Main;