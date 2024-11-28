/* eslint-disable @typescript-eslint/no-explicit-any */
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-google-places-autocomplete';
import { UseFormSetValue } from 'react-hook-form';
import { InsertionData } from '../InsertionData';

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

type Props = {
  setValue: UseFormSetValue<InsertionData>;
};

const GooglePlacesAutocompleteComponent: React.FC<Props> = ({ setValue }) => {
  const handleAddressChange = (value: any) => {
    const location = value !== null ? value['label'] : '';
    if (location) {
      geocodeByAddress(location)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          setValue('location', { label: value.label, lat, lng });
        });
    }
  };

  return (
    <div>
      <GooglePlacesAutocomplete
        apiKey={apiKey}
        selectProps={{
          onChange: handleAddressChange,
          placeholder: 'Rome, RM, Italia',
        }}
      />
    </div>
  );
};

export default GooglePlacesAutocompleteComponent;
