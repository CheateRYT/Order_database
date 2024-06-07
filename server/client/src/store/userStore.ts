import {create} from "zustand";
import {User} from "@prisma/client";



interface StoreState {
    user: User | {};
    setUser: (newUser : User) => void;
}

export const userStore = create<StoreState>((setState) => ({
    user: {},
    setUser: (newUser: User) => setState({ user: newUser })
}))