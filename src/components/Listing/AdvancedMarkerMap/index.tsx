import { APIProvider, AdvancedMarker, Map } from '@vis.gl/react-google-maps';
import { useUserAuth } from '../../../context/userAuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ListingData } from '../ListingData';
import { db } from '../../../firebaseConfig';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

const AdvancedMarkerMap: React.FC = () => {
  const user = useUserAuth();
  const navigate = useNavigate();

  const getData = async (userId: string) => {
    try {
      const q = query(
        collection(db, 'listings'),
        where('userId', '==', userId),
      );
      const querySnapshot = await getDocs(q);
      const listings = querySnapshot.docs.map(doc => {
        const docData = doc.data();
        return {
          id: doc.id,
          ...docData,
        } as ListingData;
      });

      return listings;
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const { data: listings } = useQuery({
    queryFn: () => getData(user?.uid || ''),
    queryKey: ['listings', 'byUser', user?.uid],
  });

  const handleClick = (id: string) => {
    navigate(`/listings/${id}`);
  };

  return (
    <APIProvider apiKey={apiKey}>
      <div className="flex items-center justify-center">
        <div className="w-screen h-screen">
          <Map
            style={{ width: '100vw', height: '100vh' }}
            className="w-full h-full"
            defaultCenter={{ lat: 41.902782, lng: 12.496366 }}
            defaultZoom={6}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            mapId={'a4a8b5c05baf8337'}
          >
            {listings?.map(listing => (
              <AdvancedMarker
                key={listing.id}
                onClick={() => handleClick(listing.id)}
                position={{
                  lat: listing.location?.lat,
                  lng: listing.location?.lng,
                }}
              >
                <img
                  className="rounded-full border-2 border-black w-12 h-12 object-cover"
                  src={listing.imageUrls ? listing.imageUrls[0] : undefined}
                  width={50}
                  height={50}
                />
              </AdvancedMarker>
            ))}
          </Map>
        </div>
      </div>
    </APIProvider>
  );
};

export default AdvancedMarkerMap;
