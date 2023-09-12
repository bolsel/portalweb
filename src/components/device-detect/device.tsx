import { ReactNode } from 'react';
import * as rdd from 'react-device-detect';

interface DeviceProps {
  children: (props: typeof rdd) => ReactNode;
}

export default function DeviceDetect(props: DeviceProps) {
  return <>{props.children(rdd)}</>;
}