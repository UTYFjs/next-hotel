import { eachDayOfInterval } from 'date-fns';
import { supabase } from './supabase';
import { BookingType, CabinType, CountryType, GuestType, SettingsType } from '../_types/dataTypes';
import { notFound } from 'next/navigation';

// GET

export async function getCabin(id: string): Promise<CabinType> {
  const { data, error } = await supabase
    .from('cabins')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    notFound();
    console.error(error);
  }

  return data;
}

export const getCabins = async function (): Promise<CabinType[]> {
   let { data, error } = await supabase.from('cabins').select('*').order('name');
// await new Promise((res) => setTimeout(res, 2000));
  if (error) {
    console.error(error);

    throw new Error('Cabins could not be loaded');

  }

  return data ? data: [] ;
};

export async function getCabinPrice(id: string) {
  const { data, error } = await supabase
    .from('cabins')
    .select('regularPrice, discount')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

// Guests are uniquely identified - email address
export async function getGuest(email: string | null | undefined): Promise<GuestType> {
  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .eq('email', email)
    .single();
  return data;
}
export async function getBooking(id: string): Promise<BookingType> {
  const { data, error, count } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not get loaded');
  }

  return data;
}

export async function getBookingsByGuest(guestId: string): Promise<Omit<BookingType, 'observations'>[]>  {
  // console.log('guestId222', guestId);

const { data, error, count } = await supabase
  .from('bookings')
  .select(
    'id, created_at, startDate, endDate, numberNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image), status'
  )
  .eq('guestId', guestId)
  .order('startDate');

if (error) {
  console.error(error);
  throw new Error('Bookings could not get loaded');
}

  return data as unknown as BookingType[];

  
}

export async function getBookedDatesByCabinId(cabinId: string) {
  let today: Date | string = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('cabinId', cabinId)
    .or(`startDate.gte.${today},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings(): Promise<SettingsType> {
  const { data, error } = await supabase.from('settings').select('*').single();
  // await new Promise((res) => setTimeout(res, 5000));
  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }

  return data;
}


export async function getCountries(): Promise<CountryType[]> {
  try {
    const res = await fetch(
      'https://restcountries.com/v2/all?fields=name,flag'
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error('Could not fetch countries');
  }
}

// CREATE

export async function createGuest(newGuest: Pick<GuestType, 'fullName' | 'email'>) {
  const { data, error } = await supabase.from('guests').insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error('Guest could not be created');
  }

  return data;
}

// export async function createBooking(newBooking) {
//   const { data, error } = await supabase
//     .from('bookings')
//     .insert([newBooking])
//     // created object gets returned
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error('Booking could not be created');
//   }

//   return data;
// }

// // UPDATE

// // updatedFields an object which should ONLY contain the updated data
// export async function updateGuest(id: string, updatedFields: Partial<GuestType>) {
//   const { data, error } = await supabase
//     .from('guests')
//     .update(updatedFields)
//     .eq('id', id)
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error('Guest could not be updated');
//   }
//   return data;
// }

// export async function updateBooking(id:string, updatedFields) {
//   const { data, error } = await supabase
//     .from('bookings')
//     .update(updatedFields)
//     .eq('id', id)
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error('Booking could not be updated');
//   }
//   return data;
// }

// DELETE

export async function deleteBooking(id:string) {
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}
