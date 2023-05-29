import { useToast } from '@chakra-ui/react';

export const useNotification = () => {
    const toast = useToast();

    const loginSuccess = () => {
        return toast({
            title: 'Вы успешно вошли в аккаунт',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const loginError = (errorMsg: string) => {
        return toast({
            title: 'Ошибка входа',
            description: errorMsg,
            duration: 3000,
            isClosable: true,
        });
    };

    const logoutSuccess = () => {
        return toast({
            title: 'Вы вышли из аккаунта',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const signUpError = (errorMsg: string) => {
        return toast({
            title: 'Ошибка регистрации',
            description: errorMsg,
            duration: 3000,
            isClosable: false,
        });
    };

    const confirmEmail = () => {
        return toast({
            title: 'Проверьте электронную почту',
            description: 'Вам придет письмо с подтверждением регистрации',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const parametersSet = () => {
        return toast({
            title: 'Параметры успешно применены',
            status: 'success',
            duration: 1500,
            isClosable: true,
        });
    };

    return {
        loginSuccess,
        loginError,
        logoutSuccess,
        confirmEmail,
        signUpError,
        parametersSet,
    };
};
