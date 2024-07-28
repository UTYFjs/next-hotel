'use client'
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { CabinType, SettingsType } from '../_types/dataTypes';
import { useReservation } from './ReservationContext';
import { differenceInDays, isPast, isSameDay, isWithinInterval } from 'date-fns';
import { useWindowWidth } from '../_hooks/useWindowWidth';

type DateSelectorProps = {
  settings: SettingsType; 
  bookedDates: Date[]; 
  cabin: CabinType;
}

const isAlreadyBooked = (range: DateRange | undefined, datesArr: Date[]) =>{
  return (range && range.from && 
    range.to && 
    datesArr.some((date) => isWithinInterval(date, {start: range.from as Date, end: range.to as Date}))
  )

}





export const DateSelector = ({ settings, bookedDates, cabin }: DateSelectorProps) =>  {
  const {range, setRange, resetRange} = useReservation();
  const {isMobile} = useWindowWidth();
  const displayRange = isAlreadyBooked(range, bookedDates) ? undefined : range

  const {regularPrice, discount} = cabin

  const numNights =  range?.to && range?.from ? differenceInDays(range?.to, range?.from) : 0;
  const cabinPrice = (regularPrice - discount)*numNights;

  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="relative gap-2 flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        onSelect={(range)=> {
          if(setRange) setRange(range)
          }}
        selected={displayRange}
        
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={isMobile? 1 : 2}
        //todo rewrite disabled
        disabled={(curr)=>{
          if(isPast(curr)) return true
          if(bookedDates.some(date => isSameDay(date, curr))) return true
          return false
        }}
      />

      <div className="flex items-center justify-between px-1 sm:px-8 bg-accent-500 text-primary-800 h-[58px] sm:h-[72px]">
        <div className="flex items-baseline gap-2 sm:gap-6">
          <p className="flex gap-1 sm:gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-xl sm:text-2xl">${regularPrice - discount}</span>
                <span className="text-base sm:text-xl line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-1 sm:px-3  sm:py-2 text-center text-xl sm:text-2xl max-h-[58px] sm:max-h-full">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-base sm:text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-base sm:text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-3 sm:px-4 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}


