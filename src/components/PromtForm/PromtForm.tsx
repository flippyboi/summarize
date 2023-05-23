import React, { useCallback, useRef, useState } from 'react';

import { Button, Flex, Textarea, Text, Spinner, Select, Checkbox } from '@chakra-ui/react';
import { isMobile } from 'react-device-detect';

import { TypewriterAnimated } from '../../assets/TypewriterAnimated';
import { createCompletion } from '../../utils/gpt';
import { PromtResult } from '../PromtResult/PromtResult';

const options = [
    {
        key: 'summarize',
        text: 'Сократить текст',
    },
    {
        key: 'theses',
        text: 'Выделить тезисы',
    },
    {
        key: 'mistakes',
        text: 'Найти ошибки',
    },
];

export const PromtForm = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<string | undefined>('');
    const handleRequest = useCallback(() => {
        setIsLoading(true);
        createCompletion(textareaRef.current?.value)
            .then(res => {
                setResult(res);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <Flex
            height={isMobile ? '80vh' : '85vh'}
            gap="10px"
            direction={isMobile ? 'column' : 'row'}
        >
            <Flex direction="column" width={isMobile ? '100%' : '50%'} height="100%">
                <Select mb={4} defaultValue="summarize">
                    {options.map(option => (
                        <option key={option.key} value={option.key}>
                            {option.text}
                        </option>
                    ))}
                </Select>
                <Textarea height="100%" ref={textareaRef} />
                <Flex align="center" justify="end" gap={2} mt={2} p={2}>
                    <Checkbox p={2} boxShadow="md">
                        Форматировать🪄
                    </Checkbox>
                    <Checkbox p={2} boxShadow="md">
                        Добавить заголовок🏷️
                    </Checkbox>
                </Flex>
                <Flex align="center" mt="4" gap="2">
                    <Button width="100%" disabled={true} onClick={handleRequest}>
                        Go
                    </Button>
                </Flex>
            </Flex>
            <Flex justify="center" align="center" mt="4">
                {isLoading && <TypewriterAnimated />}
            </Flex>
            <Flex>
                <PromtResult resultText={result} />
            </Flex>
        </Flex>
    );
};
