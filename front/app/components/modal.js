'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function Modal({ modal_name, path, form }) {
  const searchParams = useSearchParams()
  const usepathname = usePathname()
  const pathname = usepathname !== undefined ? usepathname : '/'
  const modal = searchParams.get(path)

  return (
    <>
      {modal && (
        <div
          id="loginModal"
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center "
        >
          <div className="bg-white p-8 rounded-lg shadow-md relative">
            <h2 className="text-lg font-bold mb-4">{modal_name}</h2>
            <Link
              href={`${pathname}`}
              className="absolute top-6 right-4 text-gray-600 hover:text-gray-900"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Link>
            {form}
          </div>
        </div>
      )}
    </>
  )
}
