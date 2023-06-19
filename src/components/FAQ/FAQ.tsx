import React from 'react';

import { Divider, Modal, ModalBody, Text } from '@chakra-ui/react';

import useWindowSize from '../../hooks/useWindowSize';
import { MobileSheet } from '../MobileSheet/MobileSheet';

export const FAQ: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const { isMobile } = useWindowSize();
    const Content: React.FC = () => {
        return (
            <>
                <Text fontSize={20} fontWeight={600}>
                    Что умеет приложение?
                </Text>
                <Text>Сокращать и перефразировать текст</Text>
                <Divider mt={3} mb={3} />
                <Text fontSize={20} fontWeight={600}>
                    Что умеет приложение?
                </Text>
                <Text>Сокращать и перефразировать текст</Text>
            </>
        );
    };
    if (isMobile) {
        return (
            <MobileSheet
                snapPoints={[window.innerHeight - 100]}
                isOpen={isOpen}
                onClose={onClose}
                header={
                    <Text fontWeight={600} fontSize={24}>
                        О приложении
                    </Text>
                }
                content={<Content />}
            />
        );
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalBody>
                <Content />
            </ModalBody>
        </Modal>
    );
};
