import React from 'react';

import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import {
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useToast,
} from '@chakra-ui/react';

import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';
import { useAuthStore } from '../../zustand/store';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const emailFieldRef = React.useRef<HTMLInputElement>(null);
    const passwordFieldRef = React.useRef<HTMLInputElement>(null);
    const { signIn, signUp } = useAuth();
    const authStore = useAuthStore();

    const onSignIn = React.useCallback(() => {
        if (emailFieldRef.current?.value && passwordFieldRef.current?.value) {
            signIn(emailFieldRef.current.value, passwordFieldRef.current.value);
        }
    }, [signIn]);

    const onSignUp = React.useCallback(() => {
        if (emailFieldRef.current?.value && passwordFieldRef.current?.value) {
            signUp(emailFieldRef.current.value, passwordFieldRef.current.value);
            onClose();
        }
    }, [onClose, signUp]);

    React.useEffect(() => {
        if (authStore.isAuth) {
            onClose();
        }
    }, [authStore.isAuth, onClose]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader mt="6">
                    Войти или зарегистрироваться
                    <Text fontWeight="400" fontSize="16px" color="gray.500">
                        Чтобы сохранять результаты ╰(*°▽°*)╯
                    </Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <EmailIcon />
                        </InputLeftElement>
                        <Input ref={emailFieldRef} placeholder="E-mail" type="email" mb="4" />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <LockIcon />
                        </InputLeftElement>
                        <Input ref={passwordFieldRef} placeholder="Пароль" type="password" />
                    </InputGroup>
                </ModalBody>
                <ModalFooter>
                    <Button disabled={false} onClick={onSignIn} variant="ghost">
                        Вход
                    </Button>
                    <Button disabled={false} onClick={onSignUp} variant="ghost">
                        Регистрация
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
