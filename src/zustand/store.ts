import { create } from 'zustand';

type AuthStoreType = {
    isAuth: boolean;
    user: any;
    setUser: (userData: any) => void;
    setAuth: (isAuth: boolean) => void;
};

export const useAuthStore = create<AuthStoreType>(set => ({
    isAuth: false,
    user: {},
    setUser: userData => set({ user: userData }),
    setAuth: (status: boolean) => set({ isAuth: status }),
}));
