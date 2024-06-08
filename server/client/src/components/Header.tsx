import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import {tokenStore} from "../store/tokenStore.tsx";

const Header = () => {
    const navigate = useNavigate();

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    const handleLogoutBtn = () => {
        Cookies.remove('token');
        tokenStore.setState({ token: "" });
        navigate("/");
    };

    return (
        <div className={"Layout"}>
            <header className="d-flex justify-content-between align-items-center bg-dark text-white p-3">
                <h2 className="m-0">База заявок</h2>
                <div className="d-flex gap-2">
                    <a href="#" className="text-white" onClick={() => handleNavigate('/main')}>Главная</a>
                    <a href="#" className="text-white" onClick={() => handleNavigate('/main/notifications')}>Уведомления</a>
                    <a href="#" className="text-white" onClick={() => handleNavigate('/main/general-info')}>Общая
                        информация</a>
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