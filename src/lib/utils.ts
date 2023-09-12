export function trimSlashes(str: string) {
  return str.replace(/^\/|\/$/g, '');
}

export function rightTrimSlashes(str: string) {
  return str.replace(/\/$/, '');
}

export function templateString(str: string, obj: Record<string, any>) {
  const fn = new Function(
    'obj',
    "with(obj){ return '" +
      str
        .replace(/\n/g, '\\n')
        .split(/{{([^{}]+)}}/g)
        .map(function (expression, i) {
          return i % 2 ? "'+(" + expression.trim() + ")+'" : expression;
        })
        .join('') +
      "'; }"
  );
  return fn(obj);
}

export function documentMimeTypeLabel(mimeType: string) {
  switch (mimeType) {
    case 'application/pdf':
      return 'Portable Document Format (PDF)';

    case 'application/msword':
      return 'Microsoft Word';

    case 'application/vnd.ms-excel':
      return 'Microsoft Excel';

    default:
      return `Dokumen (${mimeType})`;
  }
}

// https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string
export function humanFileSize(bytes: any, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + ' ' + units[u];
}

export function dateToLocaleDateString(
  date: number | string | Date,
  options: Intl.DateTimeFormatOptions
) {
  return new Date(date).toLocaleDateString('id-ID', options);
}

export const toDateString = (date: any) => {
  return new Date(date).toLocaleDateString('id-ID', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
