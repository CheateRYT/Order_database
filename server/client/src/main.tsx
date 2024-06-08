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
import Notifications from "./pages/Notifications.tsx";
import GeneralInfo from "./pages/GeneralInfo.tsx";
import YourOrders from "./pages/YourOrders.tsx";
import AllOrders from "./pages/AllOrders.tsx";
import SearchOrder from "./pages/SearchOrder.tsx";
import Profile from "./pages/Profile.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="login" element={<Login/>} />

            <Route path="/main/notifications" element={<PrivateRouter Page={Notifications} />} />
            <Route path="/main/general-info" element={<PrivateRouter Page={GeneralInfo} />} />
            <Route path="/main/your-orders" element={<PrivateRouter Page={YourOrders} />} />
            <Route path="/main/all-orders" element={<PrivateRouter Page={AllOrders} />} />
            <Route path="/main/search-order" element={<PrivateRouter Page={SearchOrder} />} />
            <Route path="/main/profile" element={<PrivateRouter Page={Profile} />} />
            <Route path="/main" element={<PrivateRouter Page={Main} />} />
            <Route path="*" element={<EmptyPage/>} />
        </Routes>
    </BrowserRouter>,
);