import useUserQuery from '@/hooks/queries/user/useUserQuery';
import LoadingScreen from '../components/utils/LoadingScreen';

import FirstLoginView from '@/features/home-dashboard/FirstLoginView';
import HomePageView from '@/features/home-dashboard/HomePageView';

const HomePage = () => {
  const { data: userData, isLoading: isLoadingUserData } = useUserQuery();

  if (isLoadingUserData || !userData) return <LoadingScreen />;
  if (!userData?.club) return <FirstLoginView />;
  else return <HomePageView user={userData} />;
};

export default HomePage;
