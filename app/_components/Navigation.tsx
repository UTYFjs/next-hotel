import Link from 'next/link';
import { auth } from '../_lib/auth';
import { Paths } from '../_constants/paths';

export default async function Navigation(){
 const session = await auth()
 console.log('session', session)


  return <nav className='z-10'>
    <ul className='flex gap-5 text-xl mx-10'>
    <li>
        <Link href={Paths.MAIN} className='hover:text-accent-400 transition-colors'>Home</Link>
    </li>
    <li>
        <Link href={Paths.CABINS} className='hover:text-accent-400 transition-colors'>Cabins</Link>
    </li>
    <li>
        <Link href={Paths.ABOUT} className='hover:text-accent-400 transition-colors'>About</Link>
    </li>
      {session?.user?.image ? <li>
        <Link href={Paths.ACCOUNT} className='hover:text-accent-400 transition-colors flex items-center justify-center gap-2'>
        <img className='h-8 rounded-full' src={session.user.image} alt={session.user.name || 'avatar image'} referrerPolicy='no-referrer'/>
          <span>Guest Area</span>
        </Link>
      </li> :    <li>
          <Link href={Paths.ACCOUNT} className='hover:text-accent-400 transition-colors'>Guest Area</Link>
    </li>
    }

  </ul>
  </nav>
}