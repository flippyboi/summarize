import React from 'react';

import {
    Box,
    Button,
    Flex,
    Grid,
    Heading,
    Icon,
    List,
    ListIcon,
    ListItem,
    Text,
    useDisclosure,
} from '@chakra-ui/react';

import { LoginModal } from '../LoginModal/LoginModal';

const desc = [
    {
        title: 'Сократить текст',
        icon: '📃',
    },
    {
        title: 'Пересказать своими словами',
        icon: '🗣️',
    },
    {
        title: 'Выделить ключевые темы',
        icon: '',
    },
    {
        title: 'Перевести на другой язык',
        icon: '',
    },
    {
        title: 'Придумать заголовок',
        icon: '',
    },
    {
        title: 'Найти ошибки',
        icon: '',
    },
];

export const HomePage = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
        <Flex align="center" justify="center" flexBasis="100%">
            <Box borderRadius="lg" p={4}>
                <Heading mb={4}>Обработка текста с помощью AI</Heading>
                <Text fontSize="xl">
                    Упростите вашу работу с длинным текстом с помощью SummaryAI
                </Text>
                <LoginModal isOpen={isOpen} onClose={onClose} />
                <Grid mt={8} templateColumns="repeat(2, 1fr)" gap={3}>
                    {desc.map(item => (
                        <Flex
                            key={item.title}
                            fontSize={18}
                            fontWeight={600}
                            borderRadius={8}
                            p={6}
                            align="center"
                            justify="center"
                            border="1.5px solid darkgray"
                        >
                            {item.icon}
                            {item.title}
                        </Flex>
                    ))}
                </Grid>
                <Button mt={8} colorScheme="cyan" onClick={onOpen}>
                    Войти или создать аккаунт
                </Button>
            </Box>
        </Flex>
    );
};
