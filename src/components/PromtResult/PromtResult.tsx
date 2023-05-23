import React from 'react';

import { Modal, Text, useDisclosure } from '@chakra-ui/react';
import { isMobile } from 'react-device-detect';

export const PromtResult: React.FC<{ resultText?: string }> = ({ resultText }) => {
    const { isOpen, onClose } = useDisclosure();

    if (isMobile) {
        return (
            <Modal isOpen={false} onClose={() => true}>
                <Text>is this modal</Text>
            </Modal>
        );
    }
    // if (!resultText) {
    //     return <Text>Здесь будет результат...</Text>
    // }
    return <Text>{resultText}</Text>;
};
