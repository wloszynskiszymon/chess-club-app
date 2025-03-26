import React from 'react';
import { cn } from '../../lib/utils';

type HeadingSecondaryProps = React.PropsWithChildren &
  React.HTMLProps<HTMLDivElement>;
const HeadingSecondary = ({
  children,
  className = '',
  ...props
}: HeadingSecondaryProps) => {
  return (
    <h2
      {...props}
      className={cn(`${className} text-lg md:text-xl font-bold uppercase text-gray-800 text-ellipsis line-clamp-1 
     `)}
    >
      {children}
    </h2>
  );
};

export default HeadingSecondary;
