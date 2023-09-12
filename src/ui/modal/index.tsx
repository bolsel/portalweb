'use client';

import { Dialog, FocusTrap, Transition } from '@headlessui/react';

import {
  Dispatch,
  FC,
  Fragment,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import throttle from 'lodash/throttle';
import clsx from 'clsx';
import { IUICreateCustomizableDefine, UICreateCustomizable } from '../create';
import BaseIcon from '@/components/icons/base-icon';
import DeviceDetect from '@/components/device-detect/device';

export type UIModalComponentFC = FC<{
  closeModal: () => void;
}>;
export type UIModalType = IUICreateCustomizableDefine<
  {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    children: ReactNode;
  },
  {
    contentClassName: string;
    content: UIModalComponentFC;
    header: UIModalComponentFC;
    footer: UIModalComponentFC;
    showCloseButton: boolean;
  }
>;

export const UIModal: UIModalType['returnType'] = (props) =>
  UICreateCustomizable<UIModalType>({
    props,
    defaults: {
      showCloseButton: () => true,
      contentClassName: () =>
        'flex flex-col justify-between w-full h-full overflow-y-auto',
      content:
        ({ render, children }) =>
        ({ closeModal }) =>
          (
            <div className={render('contentClassName')}>
              {render('header')?.({ closeModal })}
              <div className="overflow-y-auto h-full flex-1">{children}</div>
              {render('footer')?.({ closeModal })}
            </div>
          ),
      header: () => () => null,
      footer:
        () =>
        ({ closeModal }) =>
          (
            <div className="bg-gray-50 flex w-full items-center justify-center py-4 z-[100] mt-auto md:mt-0 px-6">
              <button
                className="btn btn-primary btn-sm w-full !justify-center"
                onClick={closeModal}
              >
                Tutup
              </button>
            </div>
          ),
    },
    Component({ show, setShow, render }) {
      const [isFullScreen, setIsFullScreen] = useState(false);
      const [bottomSheetHeight, setBottomSheetHeight] = useState(500);
      const [isBeingDragged, setIsBeingDragged] = useState(false);

      function closeModal() {
        setIsBeingDragged(false);
        setBottomSheetHeight(0);
        setShow(false);
      }
      const onDragY = throttle(
        function (e) {
          setBottomSheetHeight(
            window.innerHeight - parseInt(e.changedTouches[0].clientY)
          );
        },
        1000 / 60,
        { leading: true, trailing: true }
      );
      const calculateBotomSheetPosition = () => {
        setIsBeingDragged(false);

        if (bottomSheetHeight > (75 * window.innerHeight) / 100) {
          setIsFullScreen(true);
        } else if (
          bottomSheetHeight > (40 * window.innerHeight) / 100 &&
          bottomSheetHeight < (75 * window.innerHeight) / 100
        ) {
          setIsFullScreen(false);
        } else {
          closeModal();
        }
      };
      const mobileView = (
        <section
          className={clsx(
            'absolute bottom-0 flex flex-col max-w-full min-w-full bg-white rounded-t-xl h-full transition-all ease-brand duration-300',
            isFullScreen ? 'min-h-full max-h-full' : 'min-h-[75%] max-h-[75%]'
          )}
          style={
            isBeingDragged
              ? {
                  bottom: 0,
                  minHeight: `${bottomSheetHeight}px`,
                  maxHeight: `${bottomSheetHeight}px`,
                  transition: 'none',
                }
              : {}
          }
        >
          {render('showCloseButton') && (
            <div className="absolute w-full flex justify-end px-4 -top-10">
              <button
                className="btn btn-primary btn-circle btn-sm"
                onClick={closeModal}
              >
                <BaseIcon
                  icon="close"
                  className="text-white font-bold w-5 h-5"
                />
              </button>
            </div>
          )}
          <div
            className="p-3"
            onTouchEnd={calculateBotomSheetPosition}
            onTouchMove={onDragY}
            onTouchMoveCapture={() => setIsBeingDragged(true)}
            onDoubleClick={() => setIsFullScreen(!isFullScreen)}
          >
            <div className="w-16 h-[4px] rounded-full bg-gray-300 mx-auto" />
          </div>
          {render('content')?.({ closeModal })}
        </section>
      );
      const desktopView = (
        <section className="bg-base-100 flex flex-col rounded-lg overflow-hidden max-h-[90%] max-w-[800px] relative">
          {render('showCloseButton') && (
            <div className="w-full flex justify-end absolute right-0 p-1">
              <button
                className="btn btn-primary btn-circle btn-sm"
                onClick={closeModal}
              >
                <BaseIcon
                  icon="close"
                  className="text-white font-bold w-5 h-5"
                />
              </button>
            </div>
          )}
          {render('content')?.({ closeModal })}
        </section>
      );

      return (
        <Transition show={show} as={Fragment}>
          <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
            <FocusTrap>
              <Dialog.Panel>
                <Transition.Child
                  enter="transition-opacity ease-in-out duration-100"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-in-out duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-40 backdrop-filter backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <Transition.Child
                    as={Fragment}
                    enter="transition ease duration-300 transform"
                    enterFrom="opacity-0 translate-y-[200px]"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease duration-300 transform"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-[100%]"
                  >
                    <div className="fixed w-full h-full inset-0 flex justify-center items-center overflow-hidden">
                      <DeviceDetect>
                        {({ isMobile }) =>
                          isMobile ? mobileView : desktopView
                        }
                      </DeviceDetect>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog.Panel>
            </FocusTrap>
          </Dialog>
        </Transition>
      );
    },
  });
