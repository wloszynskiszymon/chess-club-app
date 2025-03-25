import api from '@/api/axios';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import useAuth from '@/hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

type DropdownNavProps = {
  children: React.ReactNode;
  disabled?: boolean;
};

const DropdownNav = ({ children, disabled }: DropdownNavProps) => {
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
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => navigate('/')}
        >
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => !disabled && navigate('/tournaments')}
        >
          Tournaments
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer' onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownNav;
