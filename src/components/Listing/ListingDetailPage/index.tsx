import { useNavigate, useParams } from 'react-router-dom';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { ListingData } from '../ListingData';
import { useMutation, useQuery } from '@tanstack/react-query';
import Loading from '../../Loading';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useUserAuth } from '../../../context/userAuthContext';
import { MdDelete } from 'react-icons/md';
import { IoArrowBack } from 'react-icons/io5';
import { BsFillPencilFill } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

const ListingDetail: React.FC = () => {
  const user = useUserAuth();
  const { objectId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getListingByListingId = async (objectId: string) => {
    try {
      const linstingRef = doc(db, `listings/${objectId}`);
      const docSnap = await getDoc(linstingRef);
      return docSnap.data() as ListingData;
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const deleteData = async (objectId: string) => {
    try {
      const listingRef = doc(db, `listings/${objectId}`);
      await deleteDoc(listingRef);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const deleteListing = useMutation({
    mutationFn: () => deleteData(objectId || ''),
    onSuccess: () => {
      alert('Listing deleted!');
      navigate('/');
    },
    onError: error => {
      console.error('Failed:', error);
    },
  });

  const { data: listing, isLoading } = useQuery({
    queryFn: () => getListingByListingId(objectId || ''),
    queryKey: ['listing', 'byListingId', objectId],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-20">
        <Loading type="bars" color="#e9222a" height={30} width={30} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mt-20 mx-auto p-4">
      <div className="flex-col">
        <div className="flex justify-between items-end">
          <div className="flex-row">
            <h2 className="text-lg font-semibold text-gray-900">
              {listing?.model}
            </h2>
            <p className="text-gray-700 text-sm">{listing?.location?.label}</p>
            <p className="text-red-500 font-bold">
              €{listing?.rentalPrice}/{t('listing.price')}
            </p>
          </div>
          {user && (
            <div className="flex items-center justify-end gap-2">
              <button
                className="text-4xl"
                onClick={() => deleteListing.mutate()}
              >
                <MdDelete />
              </button>
              <button
                className="text-3xl"
                onClick={() => navigate(`/update/${objectId}`)}
              >
                <BsFillPencilFill />
              </button>
            </div>
          )}
        </div>
      </div>
      {listing?.imageUrls && listing.imageUrls.length > 0 && (
        <div className="flex flex-wrap justify-center border-2 rounded-md mt-4">
          <Carousel
            statusFormatter={(currentItem, total) => {
              return `image ${currentItem} of ${total}`;
            }}
          >
            {listing.imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Instrument ${index + 1}`}
                className="w-auto h-auto"
              />
            ))}
          </Carousel>
        </div>
      )}
      <article
        dangerouslySetInnerHTML={{ __html: `${listing?.description}` }}
        className="prose lg:prose-xl mt-9"
      />
      <button className="text-4xl mt-6" onClick={() => navigate('/')}>
        <IoArrowBack />
      </button>
    </div>
  );
};

export default ListingDetail;
