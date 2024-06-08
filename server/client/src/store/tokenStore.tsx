import {create} from "zustand";



interface StoreState {
    token: string | null;
    setToken: (newToken : string) => void;
}

export const tokenStore = create<StoreState>((setState) => ({
    token: "",
    setToken: (newToken: string) => setState({ token: newToken })
}))