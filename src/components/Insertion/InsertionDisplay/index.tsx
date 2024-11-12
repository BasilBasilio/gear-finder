import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { useEffect, useState } from 'react';
import { InsertionData } from '../types';
import { useUserAuth } from '../../../context/userAuthContext';

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
    console.log(user);
  }, []);

  return (
    <div className="p-6 font-sans bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-extrabold text-left text-gray-800 mb-6">
        {`${user?.email} insertions:`}
      </h2>

      <ul className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {insertions.map(insertion => {
          const { id, instrumentType, model, description, rentalPrice } =
            insertion;
          return (
            <li
              key={id}
              className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{model}</h2>
              </div>
              <p className="text-gray-700 text-sm">{instrumentType}</p>
              <p className="text-blue-500 font-bold"></p>
              {description}
              <p className="text-blue-500 font-bold">€{rentalPrice}/day</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default InsertionDisplay;
