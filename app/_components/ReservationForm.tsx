/* eslint-disable @next/next/no-img-element*/
'use client'
import { User } from 'next-auth';
import { CabinType } from '../_types/dataTypes';
import { useReservation } from './ReservationContext';
import { differenceInDays } from 'date-fns';
import { createReservation } from '../_lib/actions';
import { SubmitButton } from './SubmitButton';

type ReservationFormProps = {
  cabin: CabinType
  user: User
}

export const ReservationForm = ({ cabin, user  }: ReservationFormProps) =>  {
  const {range, resetRange} = useReservation()
  
  const {id, maxCapacity, regularPrice, discount } = cabin;
  let numberNights = 0

  const startDate = range?.from as Date
  const endDate = range?.to as Date
  numberNights = differenceInDays(endDate, startDate)

  const cabinPrice = numberNights*( regularPrice-discount);
  const bookingData = {
    startDate,
    endDate,
    numberNights, 
    cabinPrice,
    cabinId: id
  }

  const createReservationWithData =  createReservation.bind(null, bookingData)

  return (
    <div className='scale-[1.01]'>
      <div className='bg-primary-800 text-primary-300 px-3 sm:px-16 py-2 flex justify-between items-center'>
        <p>Logged in as</p>
        <div className='flex gap-2 sm:gap-4 items-center'>
          <img
            // Important  referrerPolicy to display google profile images
            referrerPolicy='no-referrer'
            className='h-8 rounded-full'
            src={user.image || ''}
            alt={user.name|| 'no image'}
          />
          <p>{user.name}</p>
        </div>
      </div>
      <form 
      action={async (formData) => { 
        await createReservationWithData(formData);
        resetRange();
      }}
       className='bg-primary-900 py-10 px-2 sm:px-16 text-lg flex gap-5 flex-col'>
        <div className='space-y-2'>
          <label htmlFor='numGuests'>How many guests?</label>
          <select
            name='numberGuests'
            id='numberGuests'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            required
          >
            <option value='' key=''>
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className='space-y-2'>
          <label htmlFor='observations'>
            Anything we should know about your stay?
          </label>
          <textarea
            name='observations'
            maxLength={1000}
            id='observations'
            rows={5}
            className='px-5 py-3  bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            placeholder='Any pets, allergies, special requirements, etc.?'
          />
        </div>

        <div className='flex justify-end items-center gap-6'>
          {(startDate && endDate) ? <SubmitButton pendingLabel='Reserving ...'> Reserve now</SubmitButton> : 
              <p className='text-primary-300 text-lg py-4'>Start by selecting dates</p>
          }
        </div>
      </form>
    </div>
  );
}
