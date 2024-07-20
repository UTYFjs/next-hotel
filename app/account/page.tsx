import Link from 'next/link';

export const metadata = {
  title: 'Account'
}

export default function Page() {
  return (<div> 
        <h2 className="font-semibold text-2xl text-accent-400 mb-7">
          Welcome, dear Guest!
        </h2>
        <Link className="underline text-accent-500" href="/account/reservations">
            Your Reservations&rarr;
        </Link>
          </div>
   
  );
}