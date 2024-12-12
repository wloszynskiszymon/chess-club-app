import { useNavigate } from 'react-router-dom';
import api from '../../../api/axios';
import useUserQuery from '../../../hooks/useUserQuery';
import { Button } from '../../ui/button';
import Logo from '../../utils/Logo';
import { queryClient } from '../../../App';

const Nav = () => {
  const { data } = useUserQuery();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await api.get('/auth/logout');
    if (res.status === 200) {
      queryClient.removeQueries();
      navigate('/auth/login', { replace: true });
    }
  };
  return (
    <nav className='w-full h-16 px-8 fixed bg-white z-50 overflow-hidden flex items-center justify-between'>
      <Logo className='h-16' />
      <div className='flex-center gap-4'>
        <p className=''>Hi, {data?.firstName}</p>
        <Button onClick={handleLogout} variant='outline'>
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Nav;
