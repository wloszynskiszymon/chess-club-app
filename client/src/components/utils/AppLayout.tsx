import React from 'react';
import { cn } from '../../lib/utils';

type AppLayoutProps = React.PropsWithChildren & React.HTMLProps<HTMLDivElement>;
const AppLayout = ({ children, className = '', ...props }: AppLayoutProps) => {
  return (
    <main
      {...props}
      className={cn(`${className} w-full min-h-screen bg-gray-50`)}
    >
      {children}
    </main>
  );
};

export default AppLayout;
