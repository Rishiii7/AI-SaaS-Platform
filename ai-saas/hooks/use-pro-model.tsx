import { create } from 'zustand';

type useProModelStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useProModel = create<useProModelStore>( ( set ) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false})
}));