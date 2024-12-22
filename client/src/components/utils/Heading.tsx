import React from 'react';
import { cn } from '../../lib/utils';

type HeadingProps = React.PropsWithChildren & React.HTMLProps<HTMLDivElement>;
const Heading = ({ children, className = '', ...props }: HeadingProps) => {
  return (
    <h1
      {...props}
      className={cn(`${className} text-2xl font-bold uppercase text-gray-800 
     `)}
    >
      {children}
    </h1>
  );
};

export default Heading;
