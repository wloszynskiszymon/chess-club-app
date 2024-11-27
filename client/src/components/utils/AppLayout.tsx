import React from 'react';
import { cn } from '../../lib/utils';

type AppLayoutProps = React.PropsWithChildren & React.HTMLProps<HTMLDivElement>;
const AppLayout = ({ children, className = '', ...props }: AppLayoutProps) => {
  return (
    <main
      {...props}
      className={cn(`${className} min-h-screen p-4 bg-gray-100`)}
    >
      {children}
    </main>
  );
};

export default AppLayout;
