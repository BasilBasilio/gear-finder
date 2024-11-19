import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { InsertionData } from '../InsertionFormForNewInsertion/types';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Loading';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const InsertionDetail: React.FC = () => {
  const { objectId } = useParams();

  const getInsertionByInsertionId = async (objectId: string) => {
    try {
      const insertionRef = doc(db, `insertions/${objectId}`);
      const docSnap = await getDoc(insertionRef);

      return docSnap.data() as InsertionData;
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const { data: insertion, isLoading } = useQuery({
    queryFn: () => getInsertionByInsertionId(objectId || ''),
    queryKey: ['insertions', 'byInsertionId', objectId],
  });

  return isLoading ? (
    <div className="flex items-center justify-center mt-20">
      <Loading type="bars" color="#2563eb" height={30} width={30} />
    </div>
  ) : (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-lg font-semibold text-gray-900">
        {insertion?.model}
      </h2>
      <p className="text-gray-700 text-sm">{insertion?.instrumentType}</p>
      <p className="text-gray-700 text-sm">{insertion?.location}</p>
      <p className="text-blue-500 font-bold">€{insertion?.rentalPrice}/day</p>
      {insertion?.imageUrls && insertion.imageUrls.length > 0 && (
        <div className="flex flex-wrap justify-center mt-4">
          <Carousel
            statusFormatter={(currentItem, total) => {
              return `image ${currentItem} of ${total}`;
            }}
          >
            {insertion.imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Instrument ${index + 1}`}
                className="w-auto h-auto object-contain mx-2 my-2"
              />
            ))}
          </Carousel>
        </div>
      )}
      <p className="text-gray-700 text-sm">{insertion?.notes}</p>
    </div>
  );
};

export default InsertionDetail;
