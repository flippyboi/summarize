import React from 'react';

import { CheckIcon, CopyIcon, EditIcon } from '@chakra-ui/icons';
import {
    Button,
    Divider,
    Flex,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Text,
    useDisclosure,
} from '@chakra-ui/react';

import { useNotification } from '../../hooks/useNotification';
import { supabase } from '../../hooks/useSupabase';
import useWindowSize from '../../hooks/useWindowSize';
import { useAuthStore, usePromptFormStore } from '../../zustand/store';
import { MobileSheet } from '../MobileSheet/MobileSheet';

export const PromptResult: React.FC<{ resultText?: string }> = ({ resultText }) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [isSaving, setIsSaving] = React.useState(false);
    const [isEditingName, setIsEditingName] = React.useState(false);
    const [isSaved, setIsSaved] = React.useState(false);
    const { user } = useAuthStore();
    const { isMobile } = useWindowSize();
    const { initialText, selectedPromptPreset, promptTitle, clearPromtForm } = usePromptFormStore();
    const { copiedToClipboard } = useNotification();

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        copiedToClipboard();
    };

    const onSaveResult = async () => {
        setIsSaving(true);
        await supabase
            .from('results')
            .insert([
                {
                    result_text: resultText,
                    user_id: user.id,
                    initial_text: initialText,
                    preset_id: selectedPromptPreset,
                    name: promptTitle,
                },
            ])
            .then(() => {
                setIsSaving(false);
                setIsSaved(true);
            });
    };

    const handleModalClose = () => {
        clearPromtForm();
        setIsSaved(false);
        onClose();
    };

    React.useEffect(() => {
        if (resultText && resultText?.length > 0) {
            onOpen();
        }
    }, [onOpen, resultText]);

    if (isMobile) {
        return (
            <MobileSheet
                snapPoints={[window.innerHeight - 100]}
                isOpen={isOpen}
                onClose={handleModalClose}
                header={
                    <>
                        <Flex alignItems="center">
                            {!isEditingName ? (
                                <>
                                    <Text fontWeight={600} fontSize={18}>
                                        {promptTitle?.replaceAll('"', '') || 'Результат'}
                                    </Text>
                                    <EditIcon
                                        ml={2}
                                        mt={1}
                                        onClick={() => setIsEditingName(true)}
                                    />
                                </>
                            ) : (
                                <>
                                    <Input variant="outline" placeholder="Название" />
                                    <CheckIcon ml={4} onClick={() => setIsEditingName(false)} />
                                </>
                            )}
                        </Flex>

                        {!isEditingName && !isSaved && (
                            <Button variant="ghost" onClick={onSaveResult} isLoading={isSaving}>
                                Сохранить
                            </Button>
                        )}
                        {isSaved && <Text>Сохранено</Text>}
                    </>
                }
                content={<Text>{resultText}</Text>}
            />
        );
    }

    return (
        <Modal isOpen={isOpen} onClose={handleModalClose}>
            <ModalContent>
                <ModalHeader display="flex" alignItems="center" justifyContent="space-between">
                    <Flex alignItems="center">
                        {!isEditingName ? (
                            <>
                                <Text fontWeight={600} fontSize={18}>
                                    {promptTitle?.replaceAll('"', '') || 'Результат'}
                                </Text>
                                <EditIcon ml={2} mt={1} onClick={() => setIsEditingName(true)} />
                            </>
                        ) : (
                            <>
                                <Input variant="outline" placeholder="Название" />
                                <CheckIcon ml={4} onClick={() => setIsEditingName(false)} />
                            </>
                        )}
                    </Flex>

                    {!isEditingName && !isSaved && (
                        <Button variant="ghost" onClick={onSaveResult} isLoading={isSaving}>
                            Сохранить
                        </Button>
                    )}
                    {isSaved && <Text>Сохранено</Text>}
                </ModalHeader>
                <Divider />
                <ModalBody>{resultText}</ModalBody>
                <ModalFooter>
                    <Button onClick={() => copyToClipboard(resultText)}>
                        <CopyIcon />
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
