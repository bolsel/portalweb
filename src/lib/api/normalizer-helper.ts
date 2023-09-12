import { TDirectusFile } from '@/types';
import { rightTrimSlashes, toDateString as _toDateString } from '../utils';

export const toDateStringNormalizer = _toDateString;

export const urlAssetCdnNormalizer = (file: any) => {
  const filename_disk =
    typeof file === 'string'
      ? file
      : file.filename_disk ?? `${file.fileId}.${file.extension}`;
  return `${rightTrimSlashes(
    process.env.NEXT_PUBLIC_CDN_BASE_URL!
  )}/${filename_disk}`;
};

export function imageFileNormalizer(data: TDirectusFile) {
  return {
    url: urlAssetCdnNormalizer(data),
    width: data.width,
    height: data.height,
    filesize: data.filesize,
    title: data.title,
    description: data.description,
  };
}

export function fileObjectNormalizer(data: TDirectusFile) {
  return {
    url: urlAssetCdnNormalizer(data),
    type: data.type,
    filesize: data.filesize,
    title: data.title,
    description: data.description,
  };
}

export function contentBlocksNormalizer(data: any): {
  time: number;
  blocks: Record<string, any>[];
  version: string;
} {
  try {
    if (data.blocks) {
      data.blocks = data.blocks.map((d: any) => {
        if (d.type === 'image') {
          d.data.file.filesize = d.data.file.size;
          d.data.file = imageFileNormalizer(d.data.file);
        }
        return d;
      });
    }
    return data;
  } catch (e) {
    return data;
  }
}
