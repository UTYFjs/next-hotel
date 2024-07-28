import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import { DeleteReservation } from './DeleteReservation';
import { BookingType } from '../_types/dataTypes';
import Image from 'next/image';
import Link from 'next/link';
import { Paths } from '../_constants/paths';


export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

  type ReservationCardProps = {
    booking: Omit<BookingType, 'observations'>;
    onDelete: (bookingId: string) => Promise<void>
  }
export const ReservationCard = ({ booking, onDelete }:ReservationCardProps) => {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numberNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <div className="flex flex-col sm:flex-row border border-primary-800">
      <div className='flex flex-grow'>      
        <div className="relative h-52 aspect-[1/2] sm:h-32 sm:aspect-square">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="object-cover border-r border-primary-800 z-0"
        />
      </div>

        <div className="flex-grow px-2 sm:px-6  py-1 sm:py-3 flex flex-col">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <h3 className="text-xl font-semibold">
              {numberNights} nights in Cabin {name}
            </h3>
            {isPast(new Date(startDate)) ? (
              <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                past
              </span>
            ) : (
              <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                upcoming
              </span>
            )}
          </div>

          <p className="text-lg text-primary-300">
            {format(new Date(startDate), "EEE, MMM dd yyyy")} (
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}
            ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
          </p>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 mt-auto items-baseline">
            <p className="text-xl font-semibold text-accent-400">${totalPrice}</p>
            <p className="text-primary-300 hidden sm:block">&bull;</p>
            <p className="text-lg text-primary-300">
              {numGuests} guest{numGuests > 1 && "s"}
            </p>
            <p className="ml-auto text-sm text-primary-400">
              Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
            </p>
          </div>
        </div></div>


      <div className="flex flex-row sm:flex-col justify-end w-full sm:w-[100px] border-t sm:border-l border-primary-800">
        {!isPast(startDate) ? 
        <>
        <Link
          href={`${Paths.ACCOUNT_RESERVATION_EDIT}/${id}`}
          className="group py-3 sm:py-0 flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-r sm:border-r-0 sm:border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
        >
          <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Edit</span>
        </Link>
        <DeleteReservation bookingId={id} onDelete={onDelete} /> </>
          : null}
      </div>
    </div>
  );
}

