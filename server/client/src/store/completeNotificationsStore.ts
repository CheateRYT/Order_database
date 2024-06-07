import { create } from "zustand";
import {Notification} from "@prisma/client";

interface StoreState {
    completedNotifications: Notification[];
    addCompletedNotifications: (newNotifications: Notification[]) => void;
}


export const completeNotificationsStore = create<StoreState>((setState) => ({
    completedNotifications: [],
    addCompletedNotifications: (newNotifications: Notification[]) => setState({ completedNotifications: newNotifications })
}))