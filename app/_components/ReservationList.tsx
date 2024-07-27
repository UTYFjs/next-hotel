'use client'
import { useOptimistic } from 'react'
import { BookingType } from '../_types/dataTypes'
import { ReservationCard } from './ReservationCard'
import { deleteReservation } from '../_lib/actions'

type ReservationListProps = {
  bookings: Omit<BookingType, "observations">[]
}

export const ReservationList = ({ bookings }: ReservationListProps) => {
  const [optimisticBookings, optimisticDelete]= useOptimistic(bookings, 
    (currentBookings, bookingId) => (currentBookings.filter((booking) => booking.id !== bookingId)))

   const handleDelete = async (bookingId: string) => {
    //before async fn call set optimisticDelete fn
    optimisticDelete(bookingId)
    await deleteReservation(bookingId)
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard booking={booking} key={booking.id} onDelete={handleDelete} />
      ))}
    </ul>
  )
}

