import api from '@/api/axios';
import { Button } from '../ui/button';
import useAuth from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await api.get('/auth/logout');
    if (res.status === 200) {
      logout();
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
