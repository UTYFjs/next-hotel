import { unstable_noStore as noStore } from 'next/cache'

import { getCabins } from '../_lib/data-service'
import { CabinType } from '../_types/dataTypes'
import { CabinCard } from './CabinCard'
import { cabinsFilter, CabinsFilterValue, CabinsFilterValueType } from '../_constants/cabinsFilter'
import { getDisplayedCabins } from '../_utils/getDisplayedCabins'


type CabinListProps = {
  filter?: CabinsFilterValueType
}
export const CabinList = async ({filter}: CabinListProps) => {
  // noStore();
  const cabins: CabinType[] = await getCabins();  //[cabinMock];

  if(!cabins.length) return null 

  let displayedCabins = getDisplayedCabins(cabins, filter || CabinsFilterValue.ALL);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  )
}

