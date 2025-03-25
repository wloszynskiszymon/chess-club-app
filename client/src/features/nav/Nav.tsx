import Logo from './Logo';
import MailNavIcon from './MailNavIcon';
import LogoSmall from './LogoSmall';
import { MenuIcon } from 'lucide-react';
import DropdownNav from './DropdownNav';

const Nav = ({ disabled }: { disabled?: boolean }) => {
  return (
    <nav className='w-full h-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 fixed top-0 bg-white z-50 overflow-hidden flex items-center justify-between border-b border-gray-200'>
      <div className='flex-center gap-2 sm:gap-4 md:gap-6'>
        <Logo navigateTo='/' className='h-16 hidden md:block' />
        <LogoSmall navigateTo='/' className='h-12 block md:hidden' />
      </div>

      <div className='flex-center gap-6'>
        <MailNavIcon disabled={disabled} />
        <DropdownNav disabled={disabled}>
          <MenuIcon />
        </DropdownNav>
      </div>
    </nav>
  );
};

export default Nav;
