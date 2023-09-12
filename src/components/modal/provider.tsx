'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { usePathname } from 'next/navigation';
import { UIModal, UIModalType } from '@/ui/modal';
interface ModalContextProps {
  show: (
    content: ReactNode,
    customizes?: UIModalType['customizesProps']
  ) => void;
  hide: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [modalCustomize, setModalCustomize] = useState<
    UIModalType['customizesProps'] | undefined
  >(undefined);
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    hide();
  }, [pathname]);
  const _show: ModalContextProps['show'] = (content, customize) => {
    setModalContent(content);
    setModalCustomize(customize);
    setShow(true);
  };

  const hide = () => {
    setShow(false);
    setTimeout(() => {
      setModalCustomize(undefined);
      setModalContent(null);
    }, 300); // Adjust this timeout as per your transition duration
  };

  return (
    <ModalContext.Provider value={{ show: _show, hide }}>
      {children}
      <UIModal show={show} setShow={setShow} customizes={modalCustomize}>
        {modalContent}
      </UIModal>
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
