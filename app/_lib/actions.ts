'use server'
import { revalidatePath } from 'next/cache';
import { auth, signIn, signOut } from './auth';
import { supabase } from './supabase';
import { Paths } from '../_constants/paths';

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

  // console.log('server action update profile', updateData, session?.user?.id);
   if (error) {
    console.log('error', error.message)
     throw new Error('Guest could not be updated');
   }

   revalidatePath(Paths.ACCOUNT_PROFILE)

}
