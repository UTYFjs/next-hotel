import Link from 'next/link';

export default function Navigation(){
  return <nav className='z-10'>
    <ul className='flex gap-5 text-xl mx-10'>
    <li>
      <Link href='/' className='hover:text-accent-400 transition-colors'>Home</Link>
    </li>
    <li>
      <Link href='/cabins' className='hover:text-accent-400 transition-colors'>Cabins</Link>
    </li>
    <li>
      <Link href='/about' className='hover:text-accent-400 transition-colors'>About</Link>
    </li>
    <li>
      <Link href='/account' className='hover:text-accent-400 transition-colors'>Account</Link>
    </li>
    <li>
      <Link href='/profile' className='hover:text-accent-400 transition-colors'>Profile</Link>
    </li>
  </ul>
  </nav>
}