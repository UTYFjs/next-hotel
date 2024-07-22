import { CabinList } from '../_components/CabinList';
import { Suspense } from 'react';
import Spinner from '../_components/Spinner';
import { CabinsFilterValue, CabinsFilterValueType } from '../_constants/cabinsFilter';


export const metadata = {
  title: 'Cabins'
}

export const revalidate = 5;

type CabinsPageProps = {
  searchParams: Record<string, string>
}

export default async function Page({ searchParams }: CabinsPageProps) {
  console.log('searchParams', searchParams)
  
  //todo change without as
  const filter: CabinsFilterValueType = (searchParams?.capacity ?? 'all') as CabinsFilterValueType

  return (
  <div>
    <h1 className="text-4xl mb-5 text-accent-400 font-medium">
      Our Luxury Cabins
    </h1>
    <p className="text-primary-200 text-lg mb-10">
      Cozy yet luxurious cabins, located right in the heart of the Italian
      Dolomites. Imagine waking up to beautiful mountain views, spending your
      days exploring the dark forests around, or just relaxing in your private
      hot tub under the stars. Enjoy nature&apos;s beauty in your own little
      home away from home. The perfect spot for a peaceful, calm vacation.
      Welcome to paradise.
    </p>
      <Suspense fallback={<Spinner/>}>
      <CabinList filter={filter}/>
      </Suspense>
    </div>

  );
}