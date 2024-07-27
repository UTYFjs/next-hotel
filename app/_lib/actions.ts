'use server'
import { revalidatePath } from 'next/cache';
import { auth, signIn, signOut } from './auth';
import { supabase } from './supabase';
import { Paths } from '../_constants/paths';
import { getBookingsByGuest } from './data-service';
import { BookingDataType, BookingType } from '../_types/dataTypes';
import { redirect } from 'next/navigation';

export async function signInAction() {
  await signIn  ('google', { redirectTo: '/account' });
}

export async function signOutAction(){
  await signOut({redirectTo: '/'})
}

export async function updateProfile(formData: FormData){
  const session = await auth();
  if(!session) throw new Error('You must be logged in');

  const nationalID = formData.get('nationalID') as string;
  const [nationality, countryFlag] = (
    formData.get('nationality') as string
  ).split('%');
  if (!nationalID || !/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
  throw new Error('Please provide a valid national ID');

  const updateData = {nationality, countryFlag, nationalID }

   const { data, error } = await supabase
     .from('guests')
     .update(updateData)
     .eq('id', session.user?.id)

   if (error) {
    console.log('error', error.message)
     throw new Error('Guest could not be updated');
   }

   revalidatePath(Paths.ACCOUNT_PROFILE)

}

export async function updateReservation( bookingData: FormData ){
  //1) autentication
  const session = await auth();
  if (!session) throw new Error('You must be logged in for delete reservation');
  //2) authorisation
  const guestBookings = session?.user?.id
    ? await getBookingsByGuest(session.user.id)
    : [];

  const guestBookingIds = guestBookings.map((booking) => String(booking.id));

  const bookingId = bookingData.get('bookingId') as string;
  if (!guestBookingIds.includes(bookingId)) throw new Error('You are not allowed to update this booking');
  //3) update data
  const observations = (bookingData.get('observations') as string).slice(0, 1000);
  const numGuests = Number(bookingData.get('numGuests'));
  const updatedFields: Partial<BookingType> = { observations, numGuests  };

  const { error } = await supabase
    .from('bookings')
    .update(updatedFields)
    .eq('id', bookingId)
// 4) error handling
  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
    //5) revalidation
  revalidatePath(`${Paths.ACCOUNT_RESERVATION_EDIT}/${bookingId}`);
  revalidatePath(Paths.ACCOUNT_RESERVATION);
    //6)redirect
  redirect(Paths.ACCOUNT_RESERVATION)
}

export async function deleteReservation(bookingId: string){
  const session = await auth();
  if(!session) throw new Error("You must be logged in for delete reservation")

    const guestBookings = session?.user?.id ? await getBookingsByGuest(session.user.id) : [];
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error('You are not allowed to delete this booking');

    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', bookingId);

    if (error) {
      console.error(error);
      throw new Error('Booking could not be deleted');
    }

    revalidatePath(Paths.ACCOUNT_RESERVATION)
    // todo revalidate path cabinId
    // revalidatePath(`${Paths.CABINS}/${}`);
}

export async function createReservation(
  bookingData: BookingDataType,
  formData: FormData
) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in for create reservation');

  const newBookingData = {
    ...bookingData,
    observations: formData.get('observations')?.slice(0, 1000),
    numGuests: Number(formData.get('numberGuests')),
    guestId: session.user?.id,
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: 'unconfirmed',
  };

  const { error } = await supabase
    .from('bookings')
    .insert([newBookingData])


  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }
  revalidatePath(Paths.ACCOUNT_RESERVATION);
  revalidatePath(`${Paths.CABINS}/${bookingData.cabinId}`);
  redirect(Paths.CABINS_THANKS);
}