export type CabinType = {
  id: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description?: string;
}

export type BookingType = {
  id: string;
  guestId: string;
  cabinId: string;
  startDate: string;
  endDate: string;
  numberNights: number;
  totalPrice: number;
  numGuests: number;
  status: string;
  observations: string;
  created_at: string;
  cabins: Pick<CabinType, 'name' | 'image'>;
};

export type BookingDataType = {
  startDate: Date;
  endDate: Date;
  cabinPrice: number;
} & Pick<BookingType, 'cabinId' | 'numberNights'>;

export type CountryType = {
  name: string;
  flag: string;
  independent: boolean;
};

export type SettingsType = {
  id: string;
  created_at: string;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
};


export type GuestType = {
  id: string;
  created_at: string;
  fullName: string;
  email: string;
  nationality: string;
  countryFlag: string;
  nationalID: string;
}