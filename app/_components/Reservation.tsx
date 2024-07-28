import { Suspense } from 'react';
import { auth } from '../_lib/auth';
import { getBookedDatesByCabinId, getSettings } from '../_lib/data-service';
import { CabinType } from '../_types/dataTypes';
import { DateSelector } from './DateSelector';
import { LoginMessage } from './LoginMessage';
import { ReservationForm } from './ReservationForm';
import Spinner from './Spinner';

type ReservationType = {
  cabin: CabinType
}
export default async function Reservation({cabin}: ReservationType) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  const session = await auth()
  return (
    <div className='grid sm:grid-cols-2 border border-primary-800 min-h-[400px] '>
      <Suspense fallback={<Spinner/>}> <DateSelector settings={settings} bookedDates={bookedDates} cabin={cabin} /></Suspense>
      { session?.user ? <ReservationForm cabin={cabin} user={session.user}/> : <LoginMessage/>}
    </div>
  )
}
