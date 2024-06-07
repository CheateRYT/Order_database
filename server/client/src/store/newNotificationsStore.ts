import { create } from "zustand";
import {Notification} from "@prisma/client";

interface StoreState {
    newNotifications: Notification[];
    addNewNotifications: (newNotifications: Notification[]) => void;
}


export const newNotificationsStore = create<StoreState>((setState) => ({
    newNotifications: [],
    addNewNotifications: (newNotifications: Notification[]) => setState({ newNotifications: newNotifications })
}))