import './App.css';
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const handleRegisterBtn = () => {
    navigate("/register");
  }

  const handleLoginBtn = () => {
    navigate("/login");
  }

  const handleMainBtn = () => {
    navigate("/login");
  }

  return (
      <div className="container text-center mt-5">
        <h1>Приложение для заявок на ремонт</h1>
        <button className="btn btn-primary m-2" onClick={handleRegisterBtn}>Зарегистрироваться</button>
        <button className="btn btn-primary m-2" onClick={handleLoginBtn}>Войти</button>
        <button className="btn btn-primary m-2" onClick={handleMainBtn}>Перейти в приложение</button>
      </div>
  );
}

export default App;