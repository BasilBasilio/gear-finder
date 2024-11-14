import { useLocation } from 'react-router-dom';

const InsertionDetail: React.FC = () => {
  const location = useLocation();
  const insertion = location.state?.insertion;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          {insertion.model}
        </h2>
        <p className="text-gray-700 text-sm">{insertion.instrumentType}</p>
        <p className="text-gray-700 text-sm">{insertion.description}</p>
        <p className="text-blue-500 font-bold">€{insertion.rentalPrice}/day</p>
      </div>
    </div>
  );
};
export default InsertionDetail;
