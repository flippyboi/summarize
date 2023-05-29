import React from 'react';

import { CheckIcon, EditIcon } from '@chakra-ui/icons';
import { Button, Flex, Input, Text, useDisclosure } from '@chakra-ui/react';

import { supabase } from '../../hooks/useSupabase';
import useWindowSize from '../../hooks/useWindowSize';
import { useAuthStore, usePromptFormStore } from '../../zustand/store';
import { MobileSheet } from '../MobileSheet/MobileSheet';

export const PromptResult: React.FC<{ resultText?: string }> = ({ resultText }) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [isSaving, setIsSaving] = React.useState(false);
    const [isEditingName, setIsEditingName] = React.useState(false);
    const { user } = useAuthStore();
    const { isMobile } = useWindowSize();
    const { initialText, selectedPromptPreset, promptTitle } = usePromptFormStore();

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
                //onClose();
            });
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
                onClose={onClose}
                header={
                    <>
                        <Flex alignItems="center">
                            {!isEditingName ? (
                                <>
                                    <Text fontWeight={600} fontSize={24}>
                                        Результат
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

                        {!isEditingName && (
                            <Button variant="ghost" onClick={onSaveResult} isLoading={isSaving}>
                                Сохранить
                            </Button>
                        )}
                    </>
                }
                content={<Text>{resultText}</Text>}
            />
        );
    }

    return <Text>{resultText}</Text>;
};
