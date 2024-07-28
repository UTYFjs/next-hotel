import Image from 'next/image';
import { CabinType } from '../_types/dataTypes';
import { UsersIcon } from "@heroicons/react/24/solid";
import Link from 'next/link';
import { Paths } from '../_constants/paths';

export type CabinCardProps = {
  cabin: CabinType
}

export const CabinCard = ({ cabin }: CabinCardProps) => {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="flex border-primary-800 border">
      <div className='flex-1 relative min-w-[30%]'>
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="object-cover border-r border-primary-800"
        />
      </div>
      <div className="flex-grow">
        <div className=" pt-1 sm:pt-5 sm:pb-4 px-1 sm:px-7 bg-primary-950">
          <h3 className="text-accent-500 font-semibold text-lg sm:text-2xl mb-3">
            Cabin {name}
          </h3>

          <div className="flex gap-1 sm:gap-3 items-center mb-2">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <p className="text-sm sm:text-lg text-primary-200">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex gap-1 sm:gap-3 justify-end items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-xl sm:text-3xl font-[350]">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-600">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-[350]">${regularPrice}</span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>

        <div className="bg-primary-950 border-t border-t-primary-800 text-right">
          <Link
            href={`${Paths.CABINS}/${id}`}
            className="border-l border-primary-800 py-3 sm:py-4 px-4 sm:px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

