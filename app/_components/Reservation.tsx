import { getBookedDatesByCabinId, getSettings } from '../_lib/data-service';
import { CabinType } from '../_types/dataTypes';
import { DateSelector } from './DateSelector';
import { ReservationForm } from './ReservationForm';

type ReservationType = {
  cabin: CabinType
}
export default async function Reservation({cabin}: ReservationType) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  return (
    <div className='grid grid-cols-2 border border-primary-800 min-h-[400px] '>
      <DateSelector settings={settings} bookedDates={bookedDates} cabin={cabin}/>
      <ReservationForm cabin={cabin} />
    </div>
  )
}
