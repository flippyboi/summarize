import React from 'react';

import { Spinner } from '@chakra-ui/react';

import Sheet from 'react-modal-sheet';

import styles from './MobileSheet.module.css';

type MobileSheetProps = {
    isOpen: boolean;
    onClose: () => void;
    header: React.ReactNode;
    content: React.ReactNode;
    snapPoints: number[];
    isLoading?: boolean;
};

export const MobileSheet: React.FC<MobileSheetProps> = ({
    isOpen,
    onClose,
    header,
    content,
    snapPoints,
    isLoading = false,
}) => {
    return (
        <Sheet snapPoints={snapPoints} isOpen={isOpen} onClose={onClose}>
            <Sheet.Container className={styles.container}>
                <Sheet.Header className={styles.header}>{header}</Sheet.Header>
                <Sheet.Content className={styles.content}>
                    {!isLoading ? content : <Spinner />}
                </Sheet.Content>
            </Sheet.Container>
            {/* <Sheet.Backdrop /> */}
        </Sheet>
    );
};
