import { Link } from 'react-router-dom';
import useUserQuery from '../../hooks/queries/useUserQuery';
import Logo from './Logo';
import LogoutButton from '../buttons/LogoutButton';

const Nav = ({ disabled }: { disabled?: boolean }) => {
  const { data } = useUserQuery();

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
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Nav;
