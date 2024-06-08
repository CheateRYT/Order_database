import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';

const Register = () => {
    const navigate = useNavigate();
    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const roleRef = useRef<HTMLSelectElement>(null);
    const [loading, setLoading] = useState(false);

    const handleRegisterBtn = async () => {
        setLoading(true);

        const login = loginRef.current!.value;
        const password = passwordRef.current!.value;
        const name = nameRef.current!.value;
        const role = roleRef.current!.value;
        if (!login || !password || !name) return alert("Заполните все поля!");
        if (role === "none") return alert("Выберите роль!");
        try {
            const response = await axios.post('http://localhost:8000/api/user/register', {
                login,
                password,
                name,
                role
            });

            if (response.status === 201) {
                const data = await response.data;
                Cookies.set('token', await data.token);
                alert("Успешно зарегистрированы!")
                navigate("/main");
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error("An error occurred while processing your request", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container text-center mt-5">
            <h1>Регистрация</h1>
            <input ref={loginRef} type="text" className="form-control" placeholder="Логин" />
            <input ref={passwordRef} type="text" className="form-control" placeholder="Пароль" />
            <input ref={nameRef} type="text" className="form-control" placeholder="Имя" />
            <select ref={roleRef} className="form-select" name="" id="">
                <option value="none">Выберите роль</option>
                <option value="user">Пользователь</option>
                <option value="executor">Исполнитель</option>
            </select>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <button onClick={handleRegisterBtn} className="btn btn-primary">Зарегистрироваться</button>
            )}
            <a onClick={() => navigate("/login")} className="link-danger pointer-event link-offset-2-hover">Уже зарегистрированы? Войти</a>
        </div>
    );
};

export default Register;