import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import useAuth from '@/hooks/useAuth';
import api from '@/api/axios';
import { queryClient } from '@/App';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleLogout = async () => {
    setToken(undefined);
    queryClient.clear();
    queryClient.removeQueries();

    const res = await api.get('/auth/logout');
    if (res.status === 200) {
      navigate('/auth/login', { replace: true });
    }
  };

  return (
    <Button onClick={handleLogout} variant='outline'>
      Logout
    </Button>
  );
};

export default LogoutButton;
