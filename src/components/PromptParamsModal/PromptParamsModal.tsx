import React from 'react';

import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Switch,
    Text,
    useDisclosure,
} from '@chakra-ui/react';

import { usePromptFormStore } from '../../zustand/store';

type PromptParamsModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const PromptParamsModal: React.FC<PromptParamsModalProps> = ({ isOpen, onClose }) => {
    const { isOpen: isModalOpen, onClose: onModalClose } = useDisclosure({
        isOpen,
        onClose,
    });
    const { isFormatted, isTitled, setIsFormatted, setIsTitled } = usePromptFormStore();

    const onCancel = () => {
        setIsFormatted(false);
        setIsTitled(false);
    };

    return (
        <Modal isOpen={isModalOpen} onClose={onModalClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Параметры</ModalHeader>
                <ModalBody display="flex" flexDirection="column" gap={4}>
                    <Flex align="center" justify="space-between">
                        <Text>Форматировать🪄</Text>
                        <Switch
                            isChecked={isFormatted}
                            onChange={() => setIsFormatted(!isFormatted)}
                        />
                    </Flex>
                    <Flex align="center" justify="space-between">
                        <Text>Добавить заголовок🏷️</Text>
                        <Switch isChecked={isTitled} onChange={() => setIsTitled(!isTitled)} />
                    </Flex>
                </ModalBody>
                <ModalFooter gap={2}>
                    {(isFormatted || isTitled) && (
                        <Button variant="outline" onClick={onCancel}>
                            Отменить
                        </Button>
                    )}
                    <Button onClick={onModalClose}>Закрыть</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
