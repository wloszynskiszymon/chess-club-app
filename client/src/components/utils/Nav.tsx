import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import useUserQuery from '../../hooks/queries/useUserQuery';
import { Button } from '../ui/button';
import Logo from './Logo';
import { queryClient } from '../../App';
import useAuth from '../../hooks/useAuth';

const Nav = ({ disabled }: { disabled?: boolean }) => {
  const { data } = useUserQuery();
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleLogout = async () => {
    const res = await api.get('/auth/logout');
    if (res.status === 200) {
      queryClient.cancelQueries();
      queryClient.clear();
      setToken(undefined);
      navigate('/auth/login', { replace: true });
    }
  };
  return (
    <nav className='w-full h-16 px-8 fixed top-0 bg-white z-50 overflow-hidden flex items-center justify-between'>
      <div className='flex-center gap-6'>
        <Logo className='h-16' />
        <Link className='font-bold hover:underline' to={disabled ? '' : '/'}>
          Home
        </Link>
        <Link
          className='font-bold hover:underline'
          to={disabled ? '' : '/tournaments'}
        >
          Tournaments
        </Link>
      </div>

      <div className='flex-center gap-6'>
        <p className='text-xs font-bold lowercase'>{data?.role}</p>
        <Button onClick={handleLogout} variant='outline'>
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Nav;
