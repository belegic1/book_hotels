import { create } from 'zustand';

interface LoginRegisterModalStore {
  isOpen: boolean;
  modal: string;
  onOpen: (mdl:string) => void;
  onClose: () => void;
  switchModals:(mdl:string) => void;
}

const useLoginRegisterModal = create<LoginRegisterModalStore>((set) => ({
  isOpen: false,
  modal: "login",
  onOpen: (mdl:string) => set({ isOpen: true, modal:mdl }),
  onClose: () => set({ isOpen: false }),
  switchModals:(mdl:string) => set({modal:mdl})
}));

export default useLoginRegisterModal;
