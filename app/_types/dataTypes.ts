export type CabinType = {
  id: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
}

export type BookingType = {
  id: string;
  guestId: string;
  startDate: string;
  endDate: string;
  numNights: number;
  totalPrice: number;
  numGuests: number;
  status: string;
  created_at: string;
  cabins: Pick<CabinType, 'name' | 'image'>;
};

export type CountryType = {
  name: string;
  flag: string;
};


export const bookingMock: BookingType = {
  id: 'id booking',
  guestId: 'id guest',
  startDate: '2024-02-01T11:30:30',
  endDate: '2024-05-01T11:30:30',
  numNights: 3,
  totalPrice: 150,
  numGuests: 3,
  status: 'status',
  created_at: '2024-02-01T11:30:30',
  cabins: { name: 'first Cabin', image: '/logo.png' },
};
export const cabinMock: CabinType = {
  id: 'string',
  name: 'first Cabin',
  maxCapacity: 3,
  regularPrice: 150,
  discount: 10,
  image: '/logo.png',
};

export const countryMock: CountryType = { name: 'Belarus', flag: 'belarusFlag' };