import { create } from "zustand";
import { Order} from "@prisma/client";

interface StoreState {
    myOrders: Order[];
    addMyOrders: (newMyOrders: Order[]) => void;
}


export const myOrdersStore = create<StoreState>((setState) => ({
    myOrders: [],
    addMyOrders: (newMyOrders: Order[]) => setState({ myOrders: newMyOrders })
}))