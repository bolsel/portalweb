'use client';
import { useState } from 'react';
import { IUICreateCustomizableDefine, UICreateCustomizable } from '../create';
import { TDocumentItem } from '@/types';

export type UIDocumentFrameType = IUICreateCustomizableDefine<{
  item: TDocumentItem;
}>;
const UIDocumentItemFrame = (props: UIDocumentFrameType['props']) =>
  UICreateCustomizable<UIDocumentFrameType>({
    props,
    defaults: {},
    Component({ item }) {
      const [show, setShow] = useState(false);
      return (
        <div className="mb-5 lg:mb-0 w-full h-[80vh]">
          {item.file.type === 'application/pdf' ? (
            show ? (
              <iframe
                src={item.file.url}
                className="w-full h-full rounded-lg"
              ></iframe>
            ) : (
              <div className="w-full h-full bg-base-200 rounded-lg flex justify-center items-center">
                <button
                  onClick={() => setShow(true)}
                  className="btn btn-primary"
                >
                  Lihat Dokumen
                </button>
              </div>
            )
          ) : (
            <div className="w-full h-full bg-base-200 rounded-lg flex justify-center items-center">
              Hanya Dokumen jenis PDF yang bisa dilihat langsung
            </div>
          )}
        </div>
      );
    },
  });
export default UIDocumentItemFrame;
