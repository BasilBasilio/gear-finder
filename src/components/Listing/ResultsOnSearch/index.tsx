import { useNavigate, useSearchParams } from 'react-router-dom';
import { ListingData } from '../ListingData';
import { algoliaClient } from './algoliaConfig';
import { useQuery } from '@tanstack/react-query';
import Loading from 'react-loading';
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import SearchBar from '../SearchBar';

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

const Results: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const navigate = useNavigate();

  const getListings = async () => {
    try {
      const searchKey = query ?? '';
      const res = await algoliaClient.searchForHits<ListingData>({
        requests: [
          {
            indexName: 'listings',
            query: searchKey,
          },
        ],
      });
      const listings = res.results[0].hits;
      return listings;
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  const { data: listings, isLoading } = useQuery({
    queryFn: getListings,
    queryKey: ['listings', 'byQuery', query],
  });

  const handleClick = (id: string) => {
    navigate(`/listing/${id}`);
  };

  return isLoading ? (
    <div className="flex items-center justify-center mt-20">
      <Loading type="bars" color="#e9222a" height={30} width={30} />
    </div>
  ) : (
    <>
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
                  key={listing.objectID}
                  onClick={() => handleClick(listing.objectID)}
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
      <div
        className="absolute top-28 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80
  sm:top-28 sm:w-10/12"
      >
        <SearchBar />
      </div>
    </>
  );
};

export default Results;
