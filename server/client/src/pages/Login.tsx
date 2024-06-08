import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
    const navigate = useNavigate();
    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);

    const handleLoginBtn = async () => {
        setLoading(true);
        const login = loginRef.current!.value;
        const password = passwordRef.current!.value;
        if (!login || !password) return alert("Заполните все поля!");
        try {
            const response = await axios.post('http://localhost:8000/api/user/login', {
                login,
                password,
            });
            if (response.status === 200) {
                const data = response.data;
                Cookies.set('token', data.token);
                alert("Успешно авторизированы!");
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
            <h1>Войти</h1>
            <input ref={loginRef} type="text" className="form-control" placeholder="Логин" />
            <input ref={passwordRef} type="text" className="form-control" placeholder="Пароль" />

            {loading ? (
                <p>Loading...</p>
            ) : (
                <button onClick={handleLoginBtn} className="btn btn-primary">Войти</button>
            )}
            <a onClick={() => navigate("/register")} className="link-danger pointer-event link-offset-2-hover">Нету аккаунта? Авторизироваться</a>
        </div>
    );
};

export default Login;