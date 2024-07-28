import { SubmitButton } from '@/app/_components/SubmitButton'
import { updateReservation } from '@/app/_lib/actions'
import { getBooking, getCabin } from '@/app/_lib/data-service'

type PageEditBookingProps = {
  params: { bookingId: string }
}

export async function generateMetadata({ params }: PageEditBookingProps) {
  const booking = await getBooking(params.bookingId)
  return { title: `Reservation #${booking.id}` }
}

export default async function Page({ params }: PageEditBookingProps) {
  const {bookingId} = params
  const {numGuests,  cabinId, observations } = await getBooking(bookingId);
  const {maxCapacity} = await getCabin(cabinId);


  return (
    <div>
      <h2 className="font-semibold text-center sm:text-start text-2xl text-accent-400 mb-7">
        Edit Reservation #{bookingId}
      </h2>
      <form
        action={updateReservation}
        className="bg-primary-900 py-4 sm:py-8 px-5 sm:px-12 text-lg flex gap-6 flex-col"
      >
        <input type="hidden" value={bookingId} name="bookingId" />
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={observations}
            rows={5}
            maxLength={1000}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>
        <div className="flex justify-center sm:justify-end items-center gap-6">
          <SubmitButton pendingLabel="Updating...">
            Update reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  )
}