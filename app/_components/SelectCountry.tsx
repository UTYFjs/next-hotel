import React from 'react'
import { CountryType } from '../_types/dataTypes';
import { getCountries } from '../_lib/data-service';

type SelectCountryProps = {
  defaultCountry: string;
  name: string;
  id: string;
  className: string;
}

export const SelectCountry = async ({ defaultCountry, name, id, className }: SelectCountryProps) => {
  const countries: Array<CountryType> = await getCountries();
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

