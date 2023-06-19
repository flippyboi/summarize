import { create } from 'zustand';

type AuthStoreType = {
    isAuth: boolean;
    user: any;
    setUser: (userData: any) => void;
    setAuth: (isAuth: boolean) => void;
};

type PromptFormStoreType = {
    isFormatted: boolean;
    isTitled: boolean;
    promptTitle: string | null;
    selectedPromptPreset: number;
    promptPresets: { [x: string]: any }[] | null;
    initialText: string | null;
    temperature: number;
    numSeq: number;
    length: number;
    setNumSeq: (value: number) => void;
    setLength: (value: number) => void;
    setInitialText: (text: string) => void;
    setSelectedPromptPreset: (id: number) => void;
    setIsFormatted: (value: boolean) => void;
    setIsTitled: (value: boolean) => void;
    setPromptTitle: (title: string) => void;
    setPromptPresets: (presets: { [x: string]: any }[] | null) => void;
    setTemperature: (value: number) => void;
    clearPromtForm: () => void;
};

export const useAuthStore = create<AuthStoreType>(set => ({
    isAuth: false,
    user: {},
    setUser: userData => set({ user: userData }),
    setAuth: (status: boolean) => set({ isAuth: status }),
}));

export const usePromptFormStore = create<PromptFormStoreType>(set => ({
    isFormatted: false,
    isTitled: false,
    promptTitle: null,
    selectedPromptPreset: 1,
    promptPresets: null,
    initialText: null,
    temperature: 0.5,
    numSeq: 3,
    length: 0.5,
    setPromptPresets: (presets: { [x: string]: any }[] | null) => set({ promptPresets: presets }),
    setSelectedPromptPreset: (id: number) => set({ selectedPromptPreset: id }),
    setPromptTitle: (title: string) => set({ promptTitle: title }),
    setIsFormatted: (value: boolean) => set({ isFormatted: value }),
    setIsTitled: (value: boolean) => set({ isTitled: value }),
    setInitialText: (text: string) => set({ initialText: text }),
    setTemperature: (value: number) => set({ temperature: value }),
    setNumSeq: (value: number) => set({ numSeq: value }),
    setLength: (value: number) => set({ length: value }),
    clearPromtForm: () =>
        set({
            isFormatted: false,
            isTitled: false,
            promptTitle: null,
            selectedPromptPreset: 1,
            initialText: null,
            temperature: 0.5,
            numSeq: 3,
            length: 0.5,
        }),
}));
