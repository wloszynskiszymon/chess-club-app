import useUserQuery from '@/hooks/queries/user/useUserQuery';
import LoadingScreen from '../components/utils/LoadingScreen';

import FirstLoginView from '@/components/home/FirstLoginView';
import HomePageView from '@/components/home/HomePageView';

const HomePage = () => {
  const { data: userData, isLoading: isLoadingUserData } = useUserQuery();

  if (isLoadingUserData || !userData) return <LoadingScreen />;
  else if (!userData?.club) return <FirstLoginView />;
  else return <HomePageView user={userData} />;
};

export default HomePage;
