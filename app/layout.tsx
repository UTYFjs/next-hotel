import { Header } from './_components/Header';
import "@/app/_styles/globals.css"

import {Josefin_Sans} from 'next/font/google';
import { ReservationProvider } from './_components/ReservationContext';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap'
})

export const metadata = {
  title: {
    template: "%s / The Wildhood Oasis",
    default: "Welcome / The Wildhood Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col`}>
        <Header/>
        <main className=' grid flex-1 max-w-7xl mx-auto sm:py-10 px-5 w-full'>
          <ReservationProvider>{children}</ReservationProvider>
        </main>
        <footer className='mx-auto mb-3'>Copyright by the Wildhood Oasis</footer>
      </body>
    </html>
  )
}
