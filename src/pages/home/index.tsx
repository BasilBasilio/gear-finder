import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from 'firebase/firestore';
import SearchBar from '../../components/Insertion/SearchBar';
import { db } from '../../firebaseConfig';
import { InsertionData } from '../../components/Insertion/InsertionFormForNewInsertion/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';

const Home: React.FC = () => {
  const getData = async ({
    pageParam,
  }: {
    pageParam?: QueryDocumentSnapshot;
  }) => {
    try {
      const q = pageParam
        ? query(
            collection(db, 'insertions'),
            orderBy('createdAt', 'desc'),
            startAfter(pageParam),
            limit(5),
          )
        : query(
            collection(db, 'insertions'),
            orderBy('createdAt', 'desc'),
            limit(5),
          );

      const querySnapshot = await getDocs(q);
      const insertions = querySnapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id } as InsertionData;
      });

      return {
        list: insertions,
        nextCursor: querySnapshot.docs[querySnapshot.docs.length - 1] || null,
      };
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['insertions', 'allInsertions'],
      queryFn: getData,
      initialPageParam: undefined,
      getNextPageParam: lastPage => lastPage?.nextCursor ?? undefined,
    });

  return isLoading ? (
    <div className="flex items-center justify-center mt-20">
      <Loading type="bars" color="#2563eb" height={30} width={30} />
    </div>
  ) : (
    <>
      <SearchBar />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Last Insertions
        </h1>
        <ul className="space-y-4">
          {data?.pages.flatMap(page =>
            page?.list.map(insertion => (
              <li
                key={insertion.id}
                className="bg-white border-2 rounded-lg transition-transform transform hover:scale-105"
              >
                <Link
                  to={`/insertion/${insertion.id}`}
                  className="flex flex-col sm:flex-row"
                >
                  <img
                    src={insertion.imageUrl}
                    alt={insertion.instrumentType || 'Instrument'}
                    className="w-full h-auto max-w-[300px] max-h-[200px] object-contain"
                  />
                  <div className="flex items-start space-x-4 p-4">
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-gray-900">
                        {insertion.model}
                      </h2>
                      <p className="text-gray-700 text-sm">
                        {insertion.instrumentType}
                      </p>
                      <p className="text-gray-700 text-sm">
                        {insertion.location}
                      </p>
                      <p className="text-blue-500 font-bold">
                        €{insertion.rentalPrice}/day
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            )),
          )}
        </ul>
        <div className="flex justify-center mt-4">
          <button
            disabled={!hasNextPage || isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
          >
            {isFetchingNextPage ? 'Loading...' : 'Load more insertions'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
