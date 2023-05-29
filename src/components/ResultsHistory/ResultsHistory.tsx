import React from 'react';

import { CopyIcon, DeleteIcon } from '@chakra-ui/icons';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';

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

    const [isLoading, setIsLoading] = React.useState(false);

    const Content: React.FC = () => {
        return (
            <>
                {items &&
                    items.map(item => (
                        <Card mb={4}>
                            <CardHeader display="flex" justifyContent="space-between">
                                <Text>{item.id}</Text>
                                {dayjs(item.created_at).format('DD.MM.YYYY, HH:mm')}
                            </CardHeader>
                            <CardBody>{item.result_text}</CardBody>
                            <CardFooter pt={0} justify="end">
                                <Button variant="ghost">
                                    <CopyIcon />
                                </Button>
                                <Button variant="ghost">
                                    <DeleteIcon />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
            </>
        );
    };

    React.useEffect(() => {
        setIsLoading(true);
        supabase
            .from('results')
            .select('*')
            .order('created_at', { ascending: false })
            .then(data => {
                setItems(data.data);
                setIsLoading(false);
            });
    }, []);

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
                        <Content />
                        <Content />
                    </>
                }
                isLoading={isLoading}
                snapPoints={[window.innerHeight - 100]}
            />
        );
    }
    return null;
};
