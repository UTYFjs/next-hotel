import { CabinList } from '../_components/CabinList';
import { Suspense } from 'react';
import Spinner from '../_components/Spinner';
import { CabinsFilterValue, CabinsFilterValueType } from '../_constants/cabinsFilter';
import { Filter } from '../_components/Filter';
import { ReservationReminder } from '../_components/ReservationReminder';


export const metadata = {
  title: 'Cabins'
}

export const revalidate = 5;

type CabinsPageProps = {
  searchParams: Record<string, string>
}

export default async function Page({ searchParams }: CabinsPageProps) {
  //todo change without as
  const filter: CabinsFilterValueType = searchParams?.capacity as CabinsFilterValueType ?? CabinsFilterValue.ALL

  return (
  <div>
    <h1 className="text-center text-2xl sm:text-4xl mb-1 sm:mb-5 text-accent-400 font-medium">
      Our Luxury Cabins
    </h1>
      <p className="text-primary-200 text-base sm:text-lg mb-5 sm:mb-10 text-justify">
      Cozy yet luxurious cabins, located right in the heart of the Italian
      Dolomites. Imagine waking up to beautiful mountain views, spending your
      days exploring the dark forests around, or just relaxing in your private
      hot tub under the stars. Enjoy nature&apos;s beauty in your own little
      home away from home. The perfect spot for a peaceful, calm vacation.
      Welcome to paradise.
    </p>
      <div className='flex justify-center sm:justify-end mb-8'>    <Filter /></div>

      <Suspense fallback={<Spinner/>} key={filter}>
      <CabinList filter={filter}/>
      <ReservationReminder />
      </Suspense>
    </div>

  );
}