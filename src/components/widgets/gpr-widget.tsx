'use client';

import useScript from '@/lib/hooks/use-script';
import { useRef } from 'react';

export const WidgetGPR = () => {
  const ref = useRef<HTMLDivElement>(null);
  useScript('https://widget.kominfo.go.id/gpr-widget-kominfo.min.js', ref);
  return (
    <>
      <div ref={ref}></div>
      <div
        id="gpr-kominfo-widget-container"
        className="h-full w-full overflow-y-auto"
      />
    </>
  );
};
