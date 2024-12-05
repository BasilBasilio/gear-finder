import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { ListingData } from '../ListingData';
import { useUserAuth } from '../../../context/userAuthContext';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import Loading from 'react-loading';
import { IoArrowBack } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';

const ListingDisplay: React.FC = () => {
  const user = useUserAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

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

  const { data: listings, isLoading } = useQuery({
    queryFn: () => getData(user?.uid || ''),
    queryKey: ['listings', 'byUser', user?.uid],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-20">
        <Loading type="bars" color="#e9222a" height={30} width={30} />
      </div>
    );
  }

  if (!listings || listings.length === 0) {
    return (
      <div className="flex items-center justify-center mt-24">
        <h1 className="text-2xl font-bold text-gray-900">
          {t('listing.nolisting')}
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mt-20 p-6">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {t('listing.userlisting')}
        </h1>
        <div className="flex items-center justify-end"></div>
      </div>

      <ul className="mt-6">
        {listings?.map(listing => (
          <li
            key={listing.id}
            className="bg-white border-2 rounded-lg transition-transform transform hover:scale-105 mb-4"
          >
            <Link
              to={`/listing/${listing.id}`}
              className="flex flex-col sm:flex-row"
            >
              <div className="flex flex-wrap justify-center mt-4">
                <img
                  key={listing.id}
                  src={listing.imageUrls?.[0]}
                  className="w-auto h-48 object-contain mx-2 my-2"
                />
              </div>
              <div className="flex items-start space-x-4 p-4">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {listing.model}
                  </h2>
                  <p className="text-gray-700 text-sm">
                    {listing.instrumentType}
                  </p>
                  <p className="text-gray-700 text-sm">
                    {listing.location?.label}
                  </p>
                  <p className="text-red-500 font-bold">
                    €{listing.rentalPrice}/{t('listing.price')}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <button className="text-4xl mt-6" onClick={() => navigate('/')}>
        <IoArrowBack />
      </button>
    </div>
  );
};

export default ListingDisplay;
