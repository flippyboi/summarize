import { useNotification } from './useNotification';
import { supabase } from './useSupabase';
import { useAuthStore } from '../zustand/store';

export const useAuth = () => {
    const authStore = useAuthStore();
    const {
        loginSuccess,
        loginError,
        logoutSuccess,
        confirmEmail,
        signUpError,
    } = useNotification();

    const signUp = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (data) {
            return confirmEmail();
        }
        if (error) {
            return signUpError(error.message);
        }
    };

    const signIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (data && !error) {
            authStore.setAuth(true);
            return loginSuccess();
        }
        if (error) {
            return loginError(error.message);
        }
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            authStore.setAuth(false);
            return logoutSuccess();
        }
    };

    const getUser = async () => {
        const { data, error } = await supabase.auth.getUser();
        if (data) {
            if (data.user === null) {
                authStore.setAuth(false);
            } else {
                authStore.setAuth(true);
                authStore.setUser(data.user);
            }
            return data;
        }
        if (error) {
            return error;
        }
    };

    return {
        signUp,
        signIn,
        signOut,
        getUser,
    };
};
