import React from 'react';

import { Flex } from '@chakra-ui/react';
import { isMobile } from 'react-device-detect';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

interface ContentProps {
    children: React.ReactElement;
}

const Content: React.FC<ContentProps> = ({ children }) => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: 'main page',
        },
        {
            path: '/create',
            element: 'create page',
        },
    ]);

    return (
        <Flex my="4" direction="column" borderRadius={'12px'} px="6">
            {/* <RouterProvider router={router}> */}
            {children}
            {/* </RouterProvider> */}
        </Flex>
    );
};

export default Content;
