import React from 'react';

import { ChevronDownIcon, Icon } from '@chakra-ui/icons';
import {
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Divider,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { FaUserAlt, FaBookmark, FaTired, FaMagic, FaSignOutAlt, FaInfo } from 'react-icons/fa';
import { MdSettingsSuggest } from 'react-icons/md';

import { useAuth } from '../../hooks/useAuth';
import { useAuthStore } from '../../zustand/store';
import { FAQ } from '../FAQ/FAQ';
import { PromptParamsModal } from '../PromptParamsModal/PromptParamsModal';
import { ResultsHistory } from '../ResultsHistory/ResultsHistory';

const ProfileButton = () => {
    const { signOut } = useAuth();
    const { user } = useAuthStore();
    const { onOpen, onClose, isOpen } = useDisclosure();
    const [isOpenFAQ, setIsOpenFAQ] = React.useState(false);
    const [isOpenParams, setIsOpenParams] = React.useState(false);

    return (
        <>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    <Icon mt="1" as={FaUserAlt} />
                </MenuButton>
                <MenuList>
                    <MenuItem justifyContent="center" mb="2">
                        <Text fontWeight="700">{user.email}</Text>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={onOpen}>
                        <Icon as={FaBookmark} mr="2" /> Сохраненное
                    </MenuItem>
                    <MenuItem onClick={() => setIsOpenParams(true)}>
                        <Icon as={FaMagic} mr="2" /> Параметры
                    </MenuItem>
                    <MenuItem onClick={() => setIsOpenFAQ(true)}>
                        <Icon as={FaInfo} mr="2" /> FAQ
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={signOut} mt="2" justifyContent="center">
                        <Text fontWeight="700">Выход мз аккаунта</Text>
                    </MenuItem>
                </MenuList>
                <ResultsHistory isOpen={isOpen} onClose={onClose} />
            </Menu>
            <FAQ isOpen={isOpenFAQ} onClose={() => setIsOpenFAQ(false)} />
            <PromptParamsModal isOpen={isOpenParams} onClose={() => setIsOpenParams(false)} />
        </>
    );
};

export default ProfileButton;
