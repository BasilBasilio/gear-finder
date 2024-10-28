import { useUserAuth } from '../../context/userAuthContext';

const Home: React.FC = () => {
  const user = useUserAuth();
  return <h1 className="bg-red-500">Home</h1>;
};

export default Home;
