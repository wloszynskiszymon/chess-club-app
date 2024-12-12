import { useState } from 'react';
import api from '../api/axios';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import useUserQuery from '../hooks/useUserQuery';
import LoadingScreen from '../components/utils/LoadingScreen';

import Logo from '../../public/photos/logo.png';

const HomePage = () => {
  const [result, setResult] = useState();
  const navigate = useNavigate();

  const { data, isLoading } = useUserQuery();

  console.log(data);

  const handleClick = async () => {
    try {
      const { data } = await api.get('/auth/test');
      setResult(data.message);
      toast.success('Test successful!');
    } catch (error: any) {
      setResult(error?.message);
    }
  };

  const handleLogout = async () => {
    const res = await api.get('/auth/logout');
    if (res.status === 200) {
      navigate('/auth/login', { replace: true });
    }
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div>
      <Button onClick={handleClick}>Test</Button>
      <Button onClick={handleLogout}>Logout</Button>
      <div>{result}</div>
      <p>
        {data?.role === 'COORDINATOR' &&
          !data?.club &&
          'You need to create a club bro'}
      </p>
      <p>
        {data?.role === 'CHESS_PLAYER' &&
          !data?.club &&
          'You need to join a club bro'}
      </p>

      <img className='h-28' src={Logo} />
    </div>
  );
};

export default HomePage;
