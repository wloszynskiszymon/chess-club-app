import { cn } from '@/lib/utils';
import React from 'react';

type HeadingDescriptionProps = React.PropsWithChildren &
  React.HTMLProps<HTMLDivElement>;
const HeadingDescription = ({
  children,
  className = '',
  ...props
}: HeadingDescriptionProps) => {
  return (
    <p
      {...props}
      className={cn(
        `${className} text-muted-foreground text-xs md:text-sm lg:text-md`
      )}
    >
      {children}
    </p>
  );
};

export default HeadingDescription;
