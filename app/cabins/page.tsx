import Link from 'next/link';

import Counter from '../_components/Counter';
import { cabinMock, CabinType } from '../types/dataTypes';
import { CabinCard } from '../_components/CabinCard';

type GeoLocation = {
  lat: string;
  lng: string;
};

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoLocation;
};

type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};

export const metadata = {
  title: 'Cabins'
}
export default async function Page() {

  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const data: User[] = await res.json();
  // CHANGE
  const cabins: CabinType[] = [cabinMock];
  //console.log(data)
  return (<>
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
    {cabins.length > 0 && (
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
        {cabins.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))}
      </div>
    )}
    <h1>Cabins PAge</h1>
    <ul>{data.map((user) => (<li key={user.id}>{user.name}</li>))}</ul>
    <Counter users={data}/>
  </>

  );
}