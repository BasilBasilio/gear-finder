import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { useEffect, useState } from 'react';
import { InsertionData } from '../types';
import { useUserAuth } from '../../../context/userAuthContext';
import MapResults from './MapResults';

const InsertionDisplay: React.FC = () => {
  const [insertions, setInsertions] = useState<InsertionData[]>([]);
  const user = useUserAuth();

  const getData = async () => {
    try {
      const q = query(
        collection(db, 'insertions'),
        where('userId', '==', user?.uid),
      );
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map(doc => {
        const docData = doc.data();
        return {
          id: doc.id,
          ...docData,
        } as InsertionData;
      });

      setInsertions(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-6 font-sans bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-extrabold text-left text-gray-800 mb-6">
        {`${user?.email} insertions:`}
      </h2>

      <ul className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {insertions.map(insertion => (
          <MapResults key={insertion.id} {...insertion} />
        ))}
      </ul>
    </div>
  );
};

export default InsertionDisplay;
