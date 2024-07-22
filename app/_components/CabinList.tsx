import { unstable_noStore as noStore } from 'next/cache'

import { getCabins } from '../_lib/data-service'
import { CabinType } from '../_types/dataTypes'
import { CabinCard } from './CabinCard'

export const CabinList = async () => {
  // noStore();
  const cabins: CabinType[] = await getCabins();  //[cabinMock];

  if(!cabins.length) return null 
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
     { cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  )
}

