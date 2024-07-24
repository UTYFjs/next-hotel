'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { CabinsFilterValue, CabinsFilterValueType } from '../_constants/cabinsFilter'

export const Filter = () => {
 const searchParams =  useSearchParams();
 const router = useRouter();
 const path = usePathname()

 console.log('searchParams', searchParams);
 
  const activeFilter = searchParams.get('capacity') as CabinsFilterValueType ?? CabinsFilterValue.ALL

const handleFilter = (filter: CabinsFilterValueType) => {
  const params = new URLSearchParams(searchParams)
  params.set('capacity', filter);
  console.log('params Filter', params)
  router.replace(`${path}?${params.toString()}`, {scroll: false})
}

  return (
    <div className="border border-primary-800 flex">
      <Button 
        filter={CabinsFilterValue.ALL}
        handleFilter={handleFilter}
        activeFilter={activeFilter}

      >
        All cabins
      </Button>
      <Button 
        filter={CabinsFilterValue.SMALL}
        handleFilter={handleFilter}
        activeFilter={activeFilter}       
      >
        2&mdash;3 guests
      </Button>
      <Button 
        filter={CabinsFilterValue.MEDIUM}
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button 
      filter={CabinsFilterValue.LARGE} 
      handleFilter={handleFilter} 
      activeFilter={activeFilter} > 
      8&mdash;12 guests
      </Button>
    </div>
  )
}

type ButtonProps = {
  filter: CabinsFilterValueType;
  handleFilter: (filter: CabinsFilterValueType) => void;
  activeFilter: CabinsFilterValueType;
   children: string;
}

const Button = ({ filter, handleFilter, activeFilter,  children }: ButtonProps) => {
  return (<button 
    className={`px-5 py-2 hover:bg-primary-700 ${activeFilter === filter && 'bg-primary-700'}`}
    onClick={() => handleFilter(filter)}
  >
    {children}
  </button>)

}