import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import useAuth from '@/hooks/useAuth';
import api from '@/api/axios';
import { queryClient } from '@/App';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleLogout = async () => {
    const res = await api.get('/auth/logout');

    if (res.status === 200) {
      queryClient.clear();
      queryClient.cancelQueries();
      navigate('/auth/login', { replace: true });
      setToken(undefined);
    }
  };

  return (
    <Button onClick={handleLogout} variant='outline'>
      Logout
    </Button>
  );
};

export default LogoutButton;
