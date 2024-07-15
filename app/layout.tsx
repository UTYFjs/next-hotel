import Logo from './_components/Logo'
import Navigation from './_components/Navigation'

export const metadata = {
  title: 'The Wild Oasis',
  description: 'Best Hotel Resort',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <Logo/>
          <Navigation />
          </header>

        {children}
        <footer> Copyright by the Wild Oasis</footer>
      </body>
    </html>
  )
}
