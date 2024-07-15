import Link from 'next/link';
import Counter from '../_components/Counter';

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
export default async function Page() {

  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const data: User[] = await res.json();
  console.log(data)
  return (<>
    <h1>Cabins PAge</h1>
    <ul>{data.map((user) => (<li key={user.id}>{user.name}</li>))}</ul>
    <Counter users={data}/>
  </>

  );
}