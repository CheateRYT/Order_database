import {create} from "zustand";


interface allOrderInfo {
    averageExecutionTime: number;
    totalCompletedOrders: number;
}

interface StoreState {
    allOrderInfo:allOrderInfo| {};
    setAllOrderInfo: (newAllOrderInfo : allOrderInfo) => void;
}

export const allOrderInfoStore = create<StoreState>((setState) => ({
    allOrderInfo: {},
    setAllOrderInfo: (newAllOrderInfo: allOrderInfo) => setState({ allOrderInfo: newAllOrderInfo })
}))