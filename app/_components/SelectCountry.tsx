import React from 'react'
import { countryMock, CountryType } from '../types/dataTypes';

type SelectCountryProps = {
  defaultCountry: string;
  name: string;
  id: string;
  className: string;
}

export const SelectCountry = ({ defaultCountry, name, id, className }: SelectCountryProps) => {
  const countries: Array<CountryType> = [countryMock] // await getCountries();
  const flag =
    countries.find((c) => c.name === defaultCountry)?.flag ?? '';

  return (
    <select
      name={name}
      id={id}
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value=''>Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

