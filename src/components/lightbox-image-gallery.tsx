'use client';

import 'photoswipe/dist/photoswipe.css';
import { ReactNode } from 'react';
import { Gallery, GalleryProps, useGallery } from 'react-photoswipe-gallery';
type Props = Omit<GalleryProps, 'children'> & {
  children: (open: (i: number) => void) => ReactNode;
};
const Component = ({ children }: Props) => {
  const { open } = useGallery();
  return children(open);
};

export const LightboxImageGallery = ({ children, ...props }: Props) => {
  return (
    <Gallery {...props}>
      <Component>{(open) => children(open)}</Component>
    </Gallery>
  );
};
