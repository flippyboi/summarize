import { useLayoutEffect, useState } from 'react';

export enum ScreenSize {
    xs = 'xs',
    sm = 'sm',
    md = 'md',
    lg = 'lg',
    xl = 'xl',
    xxl = 'xxl',
}

type State = {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    screenSize: ScreenSize;
};

const getScreenSize = (windowWidth: number): ScreenSize => {
    if (windowWidth > 1600) {
        return ScreenSize.xxl;
    }
    if (windowWidth > 1200) {
        return ScreenSize.xl;
    }
    if (windowWidth > 992) {
        return ScreenSize.lg;
    }
    if (windowWidth > 768) {
        return ScreenSize.md;
    }
    if (windowWidth > 576) {
        return ScreenSize.sm;
    }

    return ScreenSize.xs;
};

export default function useWindowSize() {
    const [size, setSize] = useState<State>({
        width: 0,
        height: 0,
        isMobile: false,
        isTablet: false,
        screenSize: ScreenSize.sm,
    });

    const updateSize = () => {
        setSize({
            width: window.innerWidth,
            height: window.innerHeight,
            isMobile: window.innerWidth <= 768,
            isTablet: window.innerWidth <= 1050,
            screenSize: getScreenSize(window.innerWidth),
        });
    };

    useLayoutEffect(() => {
        window.addEventListener('resize', updateSize);
        updateSize();

        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return size;
}
