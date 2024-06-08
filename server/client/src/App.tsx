import './App.css'
import {useNavigate} from "react-router-dom";

function App() {
  const navigate = useNavigate()
  const handleRegisterBtn = () => {
    navigate("/register")
  }
  const handleLoginBtn = () => {
    navigate("/login")
  }
  const handleMainBtn = () => {
    navigate("/login")
  }
  return (
   <div><h1>Приложение для заявок на ремонт</h1>
   <button onClick={handleRegisterBtn}>Зарегистрироваться</button>
     <button onClick={handleLoginBtn}>Войти</button>
     <button onClick={handleMainBtn}>Перейти в приложение</button>
   </div>


  )
}

export default App
