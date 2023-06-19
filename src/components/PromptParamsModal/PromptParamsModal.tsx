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
    Slider,
    SliderFilledTrack,
    SliderTrack,
    Switch,
    Text,
    useDisclosure,
    Input,
} from '@chakra-ui/react';

import { useNotification } from '../../hooks/useNotification';
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
    const {
        isFormatted,
        isTitled,
        numSeq,
        length,
        setIsFormatted,
        setIsTitled,
        temperature,
        setTemperature,
        setNumSeq,
        setLength,
    } = usePromptFormStore();
    const { parametersSet } = useNotification();

    const [parametersTriggered, setParametersTriggered] = React.useState(false);

    const onCancel = () => {
        setIsFormatted(false);
        setIsTitled(false);
    };

    const handleModalClose = () => {
        onModalClose();
        parametersTriggered && parametersSet();
    };

    return (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Параметры</ModalHeader>
                <ModalBody display="flex" flexDirection="column" gap={4}>
                    {/* <Flex align="center" justify="space-between">
                        <Text>Форматировать🪄</Text>
                        <Switch
                            isChecked={isFormatted}
                            onChange={() => {
                                setIsFormatted(!isFormatted);
                                setParametersTriggered(true);
                            }}
                        />
                    </Flex> */}
                    <Flex align="center" justify="space-between">
                        <Text>Придумать заголовок🏷️</Text>
                        <Switch
                            isChecked={isTitled}
                            onChange={() => {
                                setIsTitled(!isTitled);
                                setParametersTriggered(true);
                            }}
                        />
                    </Flex>
                    <Flex direction="column">
                        <Text mb={6}>Креативность генерации текста (температура)</Text>
                        <Slider
                            value={temperature}
                            min={0}
                            max={1}
                            step={0.05}
                            onChange={value => {
                                setTemperature(value);
                                setParametersTriggered(true);
                            }}
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                        </Slider>
                        <Text mt={4}>{temperature}</Text>
                    </Flex>
                    <Flex align="center" justify="space-between">
                        <Text>Количество результатов</Text>
                        <Slider
                            value={numSeq}
                            min={1}
                            max={6}
                            step={1}
                            onChange={value => setNumSeq(value)}
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                        </Slider>
                        <Text ml={2}>{numSeq}</Text>
                    </Flex>
                    <Flex align="center" justify="space-between">
                        <Text>Коэф. сокращения текста</Text>
                        <Slider
                            value={length}
                            min={0}
                            max={1}
                            step={0.05}
                            onChange={value => setLength(value)}
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                        </Slider>
                        <Text ml={2}>{length}</Text>
                    </Flex>
                </ModalBody>
                <ModalFooter gap={2}>
                    {(isFormatted || isTitled) && (
                        <Button variant="outline" onClick={onCancel}>
                            Отменить
                        </Button>
                    )}
                    <Button onClick={handleModalClose}>Закрыть</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
