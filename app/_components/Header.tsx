import Logo from './Logo'
import Navigation from './Navigation'

export const Header = () => {
  return (
    <header className='flex items-center justify-between mx-auto my-5 w-[100%] max-w-[1240px]'>
      <Logo />
      <Navigation />
    </header>
  )
}


