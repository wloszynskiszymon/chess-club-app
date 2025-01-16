import AppLayout from './AppLayout';
import Nav from './Nav';
import { PuffLoader } from 'react-spinners';

const LoadingScreen = () => {
  return (
    <AppLayout className='w-full h-screen flex-center flex-col gap-4'>
      <Nav />
      <PuffLoader className='animate-pulse' speedMultiplier={3} size={120} />
      <p className='text-gray-700 text-center font-bold text-lg animate-pulse'>
        Loading...
      </p>
    </AppLayout>
  );
};

export default LoadingScreen;
