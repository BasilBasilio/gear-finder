import { InsertionData } from '../../types';

const MapResults: React.FC<InsertionData> = ({
  model,
  instrumentType,
  description,
  rentalPrice,
}) => {
  return (
    <li className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{model}</h2>
      </div>
      <p className="text-gray-700 text-sm">{instrumentType}</p>
      <p className="text-blue-500 font-bold"> {description}</p>
      <p className="text-blue-500 font-bold">€{rentalPrice}/day</p>
    </li>
  );
};

export default MapResults;
