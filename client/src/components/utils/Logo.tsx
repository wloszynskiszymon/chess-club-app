import React from 'react';
import { cn } from '../../lib/utils';
import logoImg from '../../../public/photos/logo.png';
import { useNavigate } from 'react-router-dom';

type LogoProps = React.HTMLProps<HTMLImageElement>;
const Logo = ({ children, className = '', ...props }: LogoProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
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
