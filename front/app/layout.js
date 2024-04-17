import { Inter } from 'next/font/google'
import './globals.css'
import StoreProvider from '@/app/components/storeProvider'
import Header from '@/app/components/header'
import Modal from '@/app/components/modal'
import LoginForm from '@/app/components/loginForm'
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Articles',
  description: 'No description',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Header />
          {children}
          <Suspense>
            <Modal modal_name="Login Panel" path="login" form={<LoginForm />} />
          </Suspense>
        </StoreProvider>
      </body>
    </html>
  )
}
