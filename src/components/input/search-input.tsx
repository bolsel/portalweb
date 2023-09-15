'use client';

import BaseIcon from '@/components/icons/base-icon';
import { Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface SearchInputProps {
  currentValue?: string;
  placeholder?: string;
  pathSearch?: string;
  onSubmit?: (value: string) => void;
  onClear?: () => void;
}
export default function SearchInput({
  currentValue,
  placeholder = 'Temukan Informasi',
  onSubmit,
  onClear,
  pathSearch = '/pencarian',
}: SearchInputProps) {
  const [value, setValue] = useState(currentValue ?? '');
  const route = useRouter();
  const _onSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) onSubmit(value);
    else route.push(`${pathSearch}?q=${value}`);
  };

  useEffect(() => {
    if (currentValue) setValue(currentValue);
  }, [currentValue]);

  return (
    <form
      className="focus-within:border-primary relative flex items-center gap-2 rounded-lg bg-white border border-base-200 px-[9px] w-full py-[6px]"
      onSubmit={_onSubmit}
    >
      <BaseIcon icon="search" className="w-6 h-6 text-gray-400" />
      <input
        type="text"
        name="q"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={placeholder}
        className="min-w-0 placeholder-gray-600 border-none flex-grow focus:outline-none"
      />
      <Transition
        show={value !== ''}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <button
          onClick={(event) => {
            if (onClear) onClear();
            setValue('');
          }}
          type="button"
          className="text-base-content transition ease-in-out delay-1000"
        >
          <BaseIcon icon="close" />
        </button>
      </Transition>
      <button
        type="submit"
        className="btn btn-primary text-white normal-case btn-sm "
      >
        Cari
      </button>
    </form>
  );
}
