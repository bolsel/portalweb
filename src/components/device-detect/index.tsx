import dynamic from 'next/dynamic';
import BaseIcon from '../icons/base-icon';

const DeviceDetect = dynamic(() => import('./device'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center">
      <BaseIcon
        icon="loading"
        className="animate-spin text-primary-base stroke-2 fill-amber-200"
        width={50}
      />
    </div>
  ),
});

export default DeviceDetect;
