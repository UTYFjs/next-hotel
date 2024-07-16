import Logo from './_components/Logo'
import Navigation from './_components/Navigation'
import "@/app/_styles/globals.css"

import {Josefin_Sans} from 'next/font/google';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap'
})

console.log('josefin', josefin)
export const metadata = {
  //title: 'The Wild Oasis',
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
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
      <body className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen`}>
        <header className='m-1 sm:m-16'>
          <Logo/>
          <Navigation />
          </header>

        {children}
        <footer> Copyright by the Wild Oasis</footer>
      </body>
    </html>
  )
}
