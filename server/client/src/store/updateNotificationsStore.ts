import { create } from "zustand";
import {Notification} from "@prisma/client";

interface StoreState {
    updateNotifications: Notification[];
    addUpdateNotifications: (newNotifications: Notification[]) => void;
}


export const updateNotificationsStore = create<StoreState>((setState) => ({
    updateNotifications: [],
    addUpdateNotifications: (newNotifications: Notification[]) => setState({ updateNotifications: newNotifications })
}))