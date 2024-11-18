import ReactLoading, { LoadingType } from 'react-loading';

interface LoadingProps {
  type: LoadingType;
  color: string;
  height: number;
  width: number;
}

const Loading: React.FC<LoadingProps> = props => {
  return <ReactLoading {...props} />;
};

export default Loading;
