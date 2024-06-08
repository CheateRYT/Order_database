import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmptyPage from './pages/EmptyPage.tsx';
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import App from "./App.tsx";
import Main from "./pages/Main.tsx";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import PrivateRouter from "./utils/PrivateRoute.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/main" element={<PrivateRouter Page={Main} />} />
            <Route path="*" element={<EmptyPage/>} />
        </Routes>
    </BrowserRouter>,
);