import React from 'react';

import { Button, Flex, Icon, Text, useDisclosure, useColorMode } from '@chakra-ui/react';
import { FaUserAlt } from 'react-icons/fa';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { RxStitchesLogo } from 'react-icons/rx';

import { useAuth } from '../../../hooks/useAuth';
import { useAuthStore } from '../../../zustand/store';
import { LoginModal } from '../../LoginModal/LoginModal';
import ProfileButton from '../../MenuButton/ProfileButton';

const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { toggleColorMode, colorMode } = useColorMode();
    const { isAuth } = useAuthStore();

    return (
        <>
            <Flex align="center" justifyContent="space-between" px="4" pt="4">
                <Flex align="center" gap="2">
                    <Icon height="8" width="8" as={RxStitchesLogo} />
                    <Text
                        cursor="default"
                        fontWeight="600"
                        fontSize="20px"
                        fontFamily="Unbounded, cursive"
                    >
                        SummaryAI
                    </Text>
                </Flex>
                <Flex gap="2">
                    <Button variant="ghost" onClick={toggleColorMode}>
                        <Icon
                            height="6"
                            width="6"
                            as={colorMode === 'dark' ? MdLightMode : MdDarkMode}
                        />
                    </Button>
                    {isAuth ? (
                        <ProfileButton />
                    ) : (
                        <Button onClick={onOpen}>
                            <Icon as={FaUserAlt} />
                        </Button>
                    )}
                    {/* <ProfileButton /> */}
                </Flex>
            </Flex>
            <LoginModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default Header;
