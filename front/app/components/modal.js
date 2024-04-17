'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Modal({ modal_name, path, form }) {
  const searchParams = useSearchParams();
  const usepathname = usePathname();
  const pathname = usepathname !== undefined ? usepathname : '/';
  const modal = searchParams.get(path);

  return (
    <>
      {modal && (
        <div
          id='loginModal'
          className='fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 '
        >
          <div className='relative rounded-lg bg-white p-8 shadow-md'>
            <h2 className='mb-4 text-lg font-bold'>{modal_name}</h2>
            <Link
              href={`${pathname}`}
              className='absolute right-4 top-6 text-gray-600 hover:text-gray-900'
            >
              <svg
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </Link>
            {form}
          </div>
        </div>
      )}
    </>
  );
}
