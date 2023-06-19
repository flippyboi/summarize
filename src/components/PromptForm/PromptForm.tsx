import React, { useRef, useState } from 'react';

import { ArrowRightIcon, SettingsIcon } from '@chakra-ui/icons';
import { Button, Flex, Textarea, Select, useDisclosure } from '@chakra-ui/react';

import { useNotification } from '../../hooks/useNotification';
import { supabase } from '../../hooks/useSupabase';
import useWindowSize from '../../hooks/useWindowSize';
import { createCompletion } from '../../utils/gpt';
import { usePromptFormStore } from '../../zustand/store';
import { PromptParamsModal } from '../PromptParamsModal/PromptParamsModal';
import { PromptResult } from '../PromptResult/PromptResult';

export const PromptForm = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { isMobile } = useWindowSize();
    const { emptyField } = useNotification();
    const {
        promptPresets,
        setPromptPresets,
        selectedPromptPreset,
        setSelectedPromptPreset,
        setInitialText,
        isFormatted,
        isTitled,
        length,
        numSeq,
        setPromptTitle,
        temperature,
    } = usePromptFormStore();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<string[] | undefined>([]);
    const handleRequest = () => {
        if (textareaRef.current?.value === '') {
            return emptyField();
        }
        setIsLoading(true);
        const prompt = promptPresets?.find(preset => preset.id === selectedPromptPreset);
        if (prompt && textareaRef.current) {
            setInitialText(textareaRef.current.value);
            createCompletion(textareaRef.current.value, temperature, numSeq, length).then(res => {
                console.log(res);
                setIsLoading(false);
            });
        }
    };

    React.useEffect(() => {
        supabase
            .from('presets')
            .select('*')
            .then(({ data }) => {
                setPromptPresets(data);
            });
    }, [setPromptPresets]);

    return (
        <Flex grow={3} gap="10px" direction={isMobile ? 'column' : 'row'}>
            <Flex direction="column" width={isMobile ? '100%' : '50%'} height="100%">
                <Select
                    mb={4}
                    defaultValue="1"
                    onChange={e => setSelectedPromptPreset(+e.target.value)}
                >
                    {promptPresets &&
                        promptPresets.map(preset => (
                            <option key={preset.id} value={preset.id}>
                                {preset.name}
                            </option>
                        ))}
                </Select>
                <Textarea height="100%" ref={textareaRef} />
                <Flex align="center" mt="4" gap="2">
                    <Button variant="outline" width="100%" onClick={onOpen}>
                        Параметры
                        <SettingsIcon ml={2} />
                    </Button>
                    <Button onClick={handleRequest} isLoading={isLoading} width="100%">
                        Обработать
                        <ArrowRightIcon ml={2} />
                    </Button>
                </Flex>
            </Flex>
            <Flex height={isMobile ? 0 : '100%'}>
                {result?.map(item => (
                    <PromptResult resultText={item} />
                ))}
            </Flex>
            <PromptParamsModal isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
};
