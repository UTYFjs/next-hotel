import Link from 'next/link';
import Image from 'next/image';

import bg from '@/public/bg.png'


export default function Page() {
  return (<>
    <Image
      src={bg}
      fill
      placeholder="blur"
      quality={100}
      className="object-cover object-top"
      alt="Mountains and forests with cabin"
    />

    <div className="relative text-center">
      <h1 className="text-8xl text-primary-50 mb-20 tracking-tight font-normal">
        Welcome to paradise.
      </h1>
      <Link
        href="/cabins"
        className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
      >
        Explore luxury cabins
      </Link>
    </div>

  </>
   
  );
}
