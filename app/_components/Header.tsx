import Logo from './Logo'
import Navigation from './Navigation'

export const Header = () => {
  return (
    <header className='flex items-center justify-between m-1'>
      <Logo />
      <Navigation />
    </header>
  )
}


