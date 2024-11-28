import SearchBar from '../../components/Insertion/SearchBar';
import AdvancedMarkerMap from '../../components/Insertion/AdvancedMarkerMap';

const Home: React.FC = () => {
  return (
    <>
      <div className="blur-sm">
        <AdvancedMarkerMap />
      </div>
      <div
        className="absolute top-24 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96
  sm:top-2/4 sm:w-10/12"
      >
        <SearchBar />
      </div>
    </>
  );
};

export default Home;
