import {create} from "zustand";
import {Order} from "@prisma/client";



interface StoreState {
    orders: Order[] | [];
    setOrders: (newOrders : Order[]) => void;
}

export const ordersStore = create<StoreState>((setState) => ({
    orders: [],
    setOrders: (newOrders: Order[]) => setState({ orders: newOrders })
}))