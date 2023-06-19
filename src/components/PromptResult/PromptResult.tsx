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
import DOMPurify from 'dompurify';

import { useNotification } from '../../hooks/useNotification';
import { supabase } from '../../hooks/useSupabase';
import useWindowSize from '../../hooks/useWindowSize';
import { useAuthStore, usePromptFormStore } from '../../zustand/store';
import { MobileSheet } from '../MobileSheet/MobileSheet';

export const PromptResult: React.FC<{ results: string[] }> = ({ results }) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [isSaving, setIsSaving] = React.useState(false);
    const [isEditingName, setIsEditingName] = React.useState(false);
    const [isSaved, setIsSaved] = React.useState(false);
    const { user } = useAuthStore();
    const { isMobile } = useWindowSize();
    const {
        initialText,
        selectedPromptPreset,
        promptTitle,
        clearPromtForm,
        setPromptTitle,
    } = usePromptFormStore();
    const { copiedToClipboard } = useNotification();

    const [selectedRes, setSelectedRes] = React.useState<number>(0);
    const [editingName, setEditingName] = React.useState(promptTitle || '');

    console.log(promptTitle);

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
                    result_text: selectedRes ? results[selectedRes] : results[0],
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
        if (results.length > 0) {
            onOpen();
        }
    }, [onOpen, results]);

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
                                        {promptTitle || 'Результат'}
                                    </Text>
                                    <EditIcon
                                        ml={2}
                                        mt={1}
                                        onClick={() => setIsEditingName(true)}
                                    />
                                </>
                            ) : (
                                <>
                                    <Input
                                        variant="outline"
                                        placeholder="Название"
                                        onChange={e => setEditingName(e.target.value)}
                                    />
                                    <CheckIcon
                                        ml={4}
                                        onClick={() => {
                                            setIsEditingName(false);
                                            setPromptTitle(editingName);
                                        }}
                                    />
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
                content={results.map((result, index) => (
                    <>
                        <Text key={index} mb={2}>
                            {result}
                        </Text>
                        {results.length > 1 && (
                            <Button
                                mb={6}
                                variant={index === selectedRes ? 'solid' : 'outline'}
                                onClick={() => setSelectedRes(index)}
                            >
                                {selectedRes === index ? 'Выбрано' : 'Выбрать этот вариант'}
                            </Button>
                        )}
                    </>
                ))}
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
                <ModalBody>
                    {results.map((result, index) => (
                        <>
                            <Text>{result}</Text>
                            {results.length > 1 && (
                                <Button
                                    mb={6}
                                    mt={2}
                                    variant={index === selectedRes ? 'solid' : 'outline'}
                                    onClick={() => setSelectedRes(index)}
                                >
                                    Выбрать этот вариант
                                </Button>
                            )}
                        </>
                    ))}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => copyToClipboard(results ? results[selectedRes] : '')}>
                        <CopyIcon />
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
