import LogoutButton from '@/components/buttons/LogoutButton';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import MailNavIcon from './MailNavIcon';

const Nav = ({ disabled }: { disabled?: boolean }) => {
  return (
    <nav className='w-full h-16 px-8 fixed top-0 bg-white z-50 overflow-hidden flex items-center justify-between border-b border-gray-200'>
      <div className='flex-center gap-6'>
        <Logo navigateTo='/' className='h-16' />
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

      <div className='flex-center gap-8'>
        <MailNavIcon />
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Nav;
