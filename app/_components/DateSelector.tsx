'use client'
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { CabinType, SettingsType } from '../_types/dataTypes';
import { useState } from 'react';
import { useReservation } from './ReservationContext';
import { differenceInDays, isEqual, isPast, isSameDay, isWithinInterval } from 'date-fns';

type DateSelectorProps = {
  settings: SettingsType; 
  bookedDates: Date[]; 
  cabin: CabinType;
}

const isAlreadyBooked = (range: DateRange | undefined, datesArr: Date[]) =>{
  console.log('datesArr', datesArr);
  return (range && range.from && 
    range.to && 
    datesArr.some((date) => isWithinInterval(date, {start: range.from as Date, end: range.to as Date}))
  )

}
export const DateSelector = ({ settings, bookedDates, cabin }: DateSelectorProps) =>  {
  //const [range, setRange] = useState<DateRange | undefined>({from: undefined, to: undefined})
  const {range, setRange, resetRange} = useReservation()
  const displayRange = isAlreadyBooked(range, bookedDates) ? undefined : range
  // CHANGE
  const {regularPrice, discount} = cabin

  //let numNights = 0;
  const numNights =  range?.to && range?.from ? differenceInDays(range?.to, range?.from) : 0;
  const cabinPrice = (regularPrice - discount)*numNights;


  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;
  // console.log('settings', settings)

  // const handleOnSelect = (rangeSelect: DateRange) => {

  //   if(rangeSelect.from === range?.from ){ resetRange()}
  //   else {
  //     if (setRange) { setRange(rangeSelect) }
  //   }
    
 
  // }
  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        onSelect={(range)=> {
          if(setRange){
            console.log('range', range)
             setRange(range)
          }

          }}
        selected={displayRange}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        //todo rewrite disabled
        disabled={(curr)=>{
          if(isPast(curr)) return true
          if(bookedDates.some(date => isSameDay(date, curr))) return true
          return false
        }}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
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
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}


