import { CabinList } from '../_components/CabinList';
import { Suspense } from 'react';
import SpinnerMini from '../_components/SpinnerMini';
import Spinner from '../_components/Spinner';

// type GeoLocation = {
//   lat: string;
//   lng: string;
// };

// type Address = {
//   street: string;
//   suite: string;
//   city: string;
//   zipcode: string;
//   geo: GeoLocation;
// };

// type Company = {
//   name: string;
//   catchPhrase: string;
//   bs: string;
// };

// export type User = {
//   id: number;
//   name: string;
//   username: string;
//   email: string;
//   address: Address;
//   phone: string;
//   website: string;
//   company: Company;
// };

export const metadata = {
  title: 'Cabins'
}
export default async function Page() {
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
      <Suspense fallback={<Spinner/>}><CabinList /></Suspense>
    </div>

  );
}