import Link from 'next/link';
import { auth } from '../_lib/auth';
import { Paths } from '../_constants/paths';

export const metadata = {
  title: 'Account'
}

export default async function Page() {
  const session = await auth()

  return (<div> 
        <h2 className="font-semibold text-2xl text-accent-400 mb-7">
          Welcome, dear {session?.user?.name}!
        </h2>
        <Link className="underline text-accent-500" href={Paths.ACCOUNT_RESERVATION}>
            Your Reservations&rarr;
        </Link>
          </div>
   
  );
}