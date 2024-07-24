'use client'
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { DateRange } from 'react-day-picker';
const initialState = { from: undefined, to: undefined }
type ReserVationProviderProps = {
  children: React.ReactNode
}
type ReservationContextDefaultValueType =
  { range: DateRange | undefined; 
    setRange: Dispatch<SetStateAction<DateRange | undefined>> | undefined;
    resetRange: () => void;
   }

const ReservationContext = createContext<ReservationContextDefaultValueType>({range: initialState, setRange: undefined, resetRange: () => {}});



export const ReservationProvider = ({ children }: ReserVationProviderProps) =>{
  const [range, setRange] = useState<DateRange | undefined>(initialState)
  const resetRange = () => setRange(initialState)
  return <ReservationContext.Provider value={{range, setRange, resetRange}}>
    {children}
  </ReservationContext.Provider>
}

export function useReservation(){
  const context = useContext(ReservationContext)
  if(context === undefined) throw new Error('context was used outside provider')
    return context;
}
