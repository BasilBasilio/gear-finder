import { useSearchParams } from 'react-router-dom';
import { InsertionData } from '../types';
import { algoliaClient } from './algoliaConfig';
import { useQuery } from '@tanstack/react-query';

const Results: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  const getInsertions = async () => {
    try {
      const searchKey = query ?? '';
      const res = await algoliaClient.searchForHits<InsertionData>({
        requests: [
          {
            indexName: 'insertions',
            query: searchKey,
          },
        ],
      });
      const insertions = res.results[0].hits;
      return insertions;
    } catch (error) {
      console.error('Error fetching insertions:', error);
    }
  };

  const { data: insertions, isLoading } = useQuery({
    queryFn: getInsertions,
    queryKey: ['insertions', 'byQuery', query],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Search results for: <span className="text-blue-600">"{query}"</span>
      </h1>
      {(insertions ?? []).length > 0 ? (
        <ul className="space-y-4">
          {insertions?.map(insertion => (
            <li
              key={insertion.id}
              className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                {insertion.model}
              </h2>
              <p className="text-gray-700 text-sm">
                {insertion.instrumentType}
              </p>
              <p className="text-blue-500 font-bold">
                €{insertion.rentalPrice}/day
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-red-600 font-medium">Nessun risultato trovato.</p>
      )}
    </div>
  );
};

export default Results;
