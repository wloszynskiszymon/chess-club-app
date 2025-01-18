import { Button } from '../ui/button';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await axios.get('/auth/logout', { withCredentials: true });
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
