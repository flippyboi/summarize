import React from 'react';

import { CopyIcon, DeleteIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Grid,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';

import DOMPurify from 'dompurify';

import { useNotification } from '../../hooks/useNotification';
import { supabase } from '../../hooks/useSupabase';
import useWindowSize from '../../hooks/useWindowSize';
import { MobileSheet } from '../MobileSheet/MobileSheet';

type ResultsHistoryProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const ResultsHistory: React.FC<ResultsHistoryProps> = ({ isOpen, onClose }) => {
    const { isMobile } = useWindowSize();

    const [items, setItems] = React.useState<{ [x: string]: any }[] | null>(null);

    const [watchInitial, setWatchInitial] = React.useState<string | null>(null);

    const { copiedToClipboard, deletedHistoryItem } = useNotification();

    const [isLoading, setIsLoading] = React.useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        copiedToClipboard();
    };

    const fetchItems = async () => {
        setIsLoading(true);
        await supabase
            .from('results')
            .select('*')
            .order('created_at', { ascending: false })
            .then(data => {
                setItems(data.data);
                setIsLoading(false);
            });
    };

    const deleteItem = async (id: string) => {
        await supabase
            .from('results')
            .delete()
            .eq('id', id)
            .then(() => {
                fetchItems();
                deletedHistoryItem();
            });
    };

    React.useEffect(() => {
        fetchItems();
    }, []);

    const Content: React.FC = () => {
        return (
            <>
                {items && items.length !== 0 ? (
                    items.map(item => (
                        <Card mb={4} key={item.id} boxShadow="md">
                            <CardHeader display="flex" justifyContent="space-between">
                                <Text>{item.name}</Text>
                                {dayjs(item.created_at).format('DD.MM.YYYY, HH:mm')}
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <Text
                                    textAlign="justify"
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(
                                            watchInitial === item.id
                                                ? item.initial_text
                                                : item.result_text,
                                        ),
                                    }}
                                >
                                    {/* {watchInitial === item.id
                                        ? item.initial_text
                                        : item.result_text} */}
                                </Text>
                            </CardBody>
                            <CardFooter pt={0} justify="end">
                                <Button
                                    variant="ghost"
                                    onClick={() => copyToClipboard(item.result_text)}
                                >
                                    <CopyIcon />
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={() =>
                                        setWatchInitial(prev => (prev === null ? item.id : null))
                                    }
                                >
                                    {watchInitial === item.id ? <ViewOffIcon /> : <ViewIcon />}
                                </Button>
                                <Button variant="ghost" onClick={() => deleteItem(item.id)}>
                                    <DeleteIcon />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <Text>Пока нет сохраненных результатов</Text>
                )}
            </>
        );
    };

    if (isMobile) {
        return (
            <MobileSheet
                isOpen={isOpen}
                onClose={onClose}
                header={
                    <Text fontWeight={600} fontSize={24}>
                        Результаты
                    </Text>
                }
                content={
                    <>
                        <Content />
                    </>
                }
                isLoading={isLoading}
                snapPoints={[window.innerHeight - 100]}
            />
        );
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent minWidth="60vw">
                <ModalHeader>
                    <Text fontWeight={600} fontSize={24}>
                        Результаты
                    </Text>
                </ModalHeader>
                <ModalBody>
                    <Grid
                        templateColumns="repeat(2, 1fr)"
                        gap={2}
                        maxHeight="70vh"
                        overflowY="auto"
                    >
                        <Content />
                    </Grid>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
