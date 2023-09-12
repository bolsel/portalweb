import { Icon, IconProps, addCollection } from '@iconify/react/dist/offline';
import collections from './collections';

export type BaseIconNamesType = keyof typeof collections.icons;

addCollection(collections);

export default function BaseIcon({
  icon,
  fallback,
  ...props
}: IconProps & {
  icon: BaseIconNamesType;
  fallback?: BaseIconNamesType;
}) {
  // @ts-ignore
  if (!collections.icons[icon] && fallback) {
    icon = fallback;
  }
  return <Icon icon={`base:${icon}`} {...props} id={`icon-${icon}`} />;
}
