import { InsertionData } from '../../InsertionFormForNewInsertion/types';

const ResultsByUser: React.FC<InsertionData> = ({
  model,
  instrumentType,
  description,
  rentalPrice,
  imageUrls,
}) => {
  return (
    <li className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{model}</h2>
      </div>
      <p className="text-gray-700 text-sm">{instrumentType}</p>
      <p className="text-blue-500 font-bold"> {description}</p>
      <p className="text-blue-500 font-bold">€{rentalPrice}/day</p>
      {imageUrls && imageUrls.length > 0 && (
        <div className="flex flex-wrap justify-center mt-4">
          {imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Instrument ${index + 1}`}
              className="w-auto h-48 object-contain mx-2 my-2"
            />
          ))}
        </div>
      )}
    </li>
  );
};

export default ResultsByUser;
