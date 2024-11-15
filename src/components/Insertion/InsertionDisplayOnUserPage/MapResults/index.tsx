import { InsertionData } from '../../InsertionFormForNewInsertion/types';

const MapResults: React.FC<InsertionData> = ({
  model,
  instrumentType,
  description,
  rentalPrice,
  imageUrl,
}) => {
  return (
    <li className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{model}</h2>
      </div>
      <p className="text-gray-700 text-sm">{instrumentType}</p>
      <p className="text-blue-500 font-bold"> {description}</p>
      <p className="text-blue-500 font-bold">€{rentalPrice}/day</p>
      <img
        src={imageUrl}
        alt="Instrument"
        className="w-full h-auto max-w-[300px] max-h-[200px] object-contain"
      />
    </li>
  );
};

export default MapResults;