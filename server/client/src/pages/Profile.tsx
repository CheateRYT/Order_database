import { userStore} from "../store/userStore.ts";
import {User} from "@prisma/client";

const Profile = () => {
    const user = userStore((state) => state.user as User);
    return (
        <div className="container mt-5">
            <h1>Профиль</h1>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Информация о пользователе</h5>
                    <p className="card-text">ID: {user.id}</p>
                    <p className="card-text">Логин: {user.login}</p>
                    <p className="card-text">Имя: {user.name}</p>
                    <p className="card-text">Роль: {user.role == "executor" ? "Исполнитель" : "Пользователь"}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;