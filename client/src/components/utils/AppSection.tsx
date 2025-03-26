import { cn } from '@/lib/utils';
import React from 'react';

type AppSectionProps = React.PropsWithChildren &
  React.HTMLProps<HTMLDivElement>;
const AppSection = ({
  children,
  className = '',
  ...props
}: AppSectionProps) => {
  return (
    <section
      {...props}
      className={cn(
        `${className} w-full px-4 md:px-12 lg:px-20 xl:px-32 pt-24 `
      )}
    >
      {children}
    </section>
  );
};

export default AppSection;
