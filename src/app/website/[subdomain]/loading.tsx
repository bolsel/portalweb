import BaseIcon from '@/components/icons/base-icon';

export default function Loading() {
  return (
    <div className="w-screen h-screen bg-base-300 flex justify-center items-center">
      <BaseIcon
        icon="loading"
        className="w-20 h-20 text-primary animate-spin"
      />
    </div>
  );
}
