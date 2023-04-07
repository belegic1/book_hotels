import ClientOnly from './api/components/ClientOnly'
import RegisterModal from './api/components/modals/RegisterModal'
import Navbar from './api/components/navbar/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'
import TosaterProvider from './providers/TosaterProvider'

export const metadata = {
  title: 'Hotels',
  description: 'Hotels reservation',
}

const font = Nunito({
  subsets: ["latin"]
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <TosaterProvider />
          <RegisterModal isOpen={true} actionLabel='Submit'  />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
