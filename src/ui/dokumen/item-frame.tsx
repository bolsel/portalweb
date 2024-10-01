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
      const [skeleton, setSkeleton] = useState(true);
      return (
        <div className="mb-5 lg:mb-0 w-full h-[80vh]">
          {item.file.type === 'application/pdf' ? (
            <>
              {skeleton ? (
                <div className="w-12 h-12 w-full h-full bg-gray-200 animate-pulse rounded-md text-center py-5">
                  <div className="font-bold">Dokumen sedang dimuat...</div>
                  <div>
                    Jika viewer dokumen tidak merespon, silahkan unduh dokumen.
                  </div>
                </div>
              ) : (
                ''
              )}
              <iframe
                onLoad={() => {
                  setSkeleton(false);
                }}
                src={`https://docs.google.com/gview?url=${item.file.url}&embedded=true`}
                className="w-full h-full rounded-lg"
              >
                Memuat dokumen...
              </iframe>
            </>
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
