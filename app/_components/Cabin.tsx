import Image from 'next/image'
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import TextExpander from './TextExpander'
import { CabinType } from '../_types/dataTypes'

type CabinProps = {cabin: CabinType}

export const Cabin = ({cabin}:CabinProps) => {
  const { id, name, maxCapacity, regularPrice, discount, image, description = '' } =
    cabin;

  return (
    <div className="relative grid sm:grid-cols-[3fr_4fr] gap-2 sm:gap-20 border border-primary-800 sm:py-3 sm:px-10 mb-4 sm:mb-24">
      <div className="absolute w-[100%] aspect-square max-h-80 sm:max-h-full sm:relative sm:scale-[1.15] sm:-translate-x-3">
        <Image className='object-cover' src={image} fill alt={`Cabin ${name}`} />
      </div>

      <div className='relative z-3'>
        <h3 className="text-accent-100 font-black text-2xl sm:text-7xl mb-64 sm:mb-5 sm:translate-x-[-254px] bg-primary-950 p-6 bg-opacity-80 pb-1 sm:w-[150%]">
          Cabin {name}
        </h3>
        <div className='px-2 py-2 sm:py-0 sm:px-0 '>        
          <p className="text-lg text-primary-300 mb-4 sm:mb-10">
          <TextExpander>{description}</TextExpander>
          </p>

          <ul className="flex flex-col gap-2 sm:gap-4 mb-2 sm:mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul></div>

      </div>
    </div>
  )
}