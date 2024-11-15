import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { InsertionData } from '../types';
import { useQuery } from '@tanstack/react-query';

const InsertionDetail: React.FC = () => {
  const { objectId } = useParams();

  const getInsertionByInsertionId = async (objectId: string) => {
    try {
      const insertionRef = doc(db, `insertions/${objectId}`);
      const docSnap = await getDoc(insertionRef);

      console.log('Document data retrieved:', docSnap.data());
      return docSnap.data() as InsertionData;
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const { data: insertion, isLoading } = useQuery({
    queryFn: () => getInsertionByInsertionId(objectId || ''),
    queryKey: ['insertions', 'byInsertionId', objectId],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Dettagli dell'inserzione
      </h1>
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          {insertion?.model}
        </h2>
        <p className="text-gray-700 text-sm">{insertion?.instrumentType}</p>
        <p className="text-gray-700 text-sm">{insertion?.description}</p>
        <p className="text-blue-500 font-bold">€{insertion?.rentalPrice}/day</p>
      </div>
    </div>
  );
};

export default InsertionDetail;
