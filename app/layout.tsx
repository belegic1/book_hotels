import ClientOnly from './api/components/ClientOnly'
import RegisterModal from './api/components/modals/RegisterModal'
import Navbar from './api/components/navbar/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'
import TosaterProvider from './providers/TosaterProvider'
import LoginModal from './api/components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import LoginRegisterModal from './api/components/modals/LoginRegisterModal'
import RentModal from './api/components/modals/RentModal'
import SearchModal from './api/components/modals/SearchModal'

export const metadata = {
  title: 'Hotels',
  description: 'Hotels reservation',
}

const font = Nunito({
  subsets: ["latin"]
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
  }) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <TosaterProvider />
          <RegisterModal />
          <LoginModal />
          <LoginRegisterModal />
          <RentModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className='p-20 pt-28'>{children}</div>
      </body>
    </html>
  );
}
