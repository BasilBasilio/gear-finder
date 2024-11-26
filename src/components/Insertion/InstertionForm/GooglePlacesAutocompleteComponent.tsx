/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-google-places-autocomplete';
import { UseFormSetValue } from 'react-hook-form';
import { InsertionData } from './InsertionFormForNewInsertion/types';

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

type Props = {
  setValue: UseFormSetValue<InsertionData>;
};

const GooglePlacesAutocompleteComponent: React.FC<Props> = ({ setValue }) => {
  const [address, setAddress] = useState<any>(null);

  const handleAddressChange = (value: any) => {
    setAddress(value);
    setValue('location', value);
    const location = address !== null ? address['label'] : '';
    if (location) {
      geocodeByAddress(location)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          console.log({ lat, lng });
        });
    }
  };

  return (
    <div>
      <GooglePlacesAutocomplete
        apiKey={apiKey}
        selectProps={{
          value: address,
          onChange: handleAddressChange,
          placeholder: 'Rome, RM, Italia',
        }}
      />
    </div>
  );
};

export default GooglePlacesAutocompleteComponent;
