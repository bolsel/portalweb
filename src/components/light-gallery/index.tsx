'use client';
import {
  default as BaseLightGallery,
  LightGalleryProps,
} from 'lightgallery/react';
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-rotate.css';
// plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgRotate from 'lightgallery/plugins/rotate';

export interface UILightGalleryProps extends LightGalleryProps {
  children?: any;
}

export default function LightGallery({
  children,
  ...props
}: UILightGalleryProps) {
  return (
    <BaseLightGallery
      licenseKey="0000-0000-000-0001"
      speed={500}
      download
      plugins={[lgThumbnail, lgZoom, lgRotate]}
      {...props}
    >
      {children}
    </BaseLightGallery>
  );
}
