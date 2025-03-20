import React from 'react';
import { cn } from '@/lib/utils';
import logoImg from '@/photos/logo.png';
import { useNavigate } from 'react-router-dom';

type LogoProps = React.HTMLProps<HTMLImageElement> & {
  navigateTo?: string | undefined;
};

const Logo = ({
  children,
  className = '',
  navigateTo,
  ...props
}: LogoProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (navigateTo) navigate(navigateTo);
  };

  return (
    <img
      src={logoImg}
      alt='Logo'
      {...props}
      onClick={handleClick}
      className={cn(`${className} cursor-pointer `)}
    />
  );
};

export default Logo;
