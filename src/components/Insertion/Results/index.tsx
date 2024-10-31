import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { db } from '../../../firebaseConfig';
import { InsertionData } from '../types';

const Results: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [insertions, setInsertions] = useState<InsertionData[]>([]);
  const query = searchParams.get('query');

  useEffect(() => {
    getInsertions();
  }, []);

  const getInsertions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'insertions'));
      const insertionList: InsertionData[] = [];

      querySnapshot.forEach(doc => {
        const data = doc.data() as InsertionData;
        insertionList.push({ ...data, id: doc.id });
      });

      setInsertions(insertionList);
    } catch (error) {
      console.error('Error fetching insertions:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Search results for: <span className="text-blue-600">"{query}"</span>
      </h1>
      {insertions.length > 0 ? (
        <ul className="space-y-4">
          {insertions.map(insertion => (
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
