import { APIProvider, AdvancedMarker, Map } from '@vis.gl/react-google-maps';
import { useUserAuth } from '../../../context/userAuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { InsertionData } from '../InsertionData';
import { db } from '../../../firebaseConfig';
import { useQuery } from '@tanstack/react-query';

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

const AdvancedMarkerMap: React.FC = () => {
  const user = useUserAuth();

  const getData = async (userId: string) => {
    try {
      const q = query(
        collection(db, 'insertions'),
        where('userId', '==', userId),
      );
      const querySnapshot = await getDocs(q);
      const insertions = querySnapshot.docs.map(doc => {
        const docData = doc.data();
        return {
          id: doc.id,
          ...docData,
        } as InsertionData;
      });

      return insertions;
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const { data: insertions } = useQuery({
    queryFn: () => getData(user?.uid || ''),
    queryKey: ['insertions', 'byUser', user?.uid],
  });

  return (
    <APIProvider apiKey={apiKey}>
      <div className="flex items-center justify-center">
        <div className="w-screen h-96">
          <Map
            style={{ width: '100vw', height: '100vh' }}
            className="w-full h-full"
            defaultCenter={{ lat: 41.902782, lng: 12.496366 }}
            defaultZoom={6}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            mapId={'a4a8b5c05baf8337'}
            colorScheme="FOLLOW_SYSTEM"
            renderingType="RASTER"
          >
            {insertions?.map(insertion => (
              <AdvancedMarker
                key={insertion.id}
                position={{
                  lat: insertion.location?.lat,
                  lng: insertion.location?.lng,
                }}
              />
            ))}
          </Map>
        </div>
      </div>
    </APIProvider>
  );
};

export default AdvancedMarkerMap;
