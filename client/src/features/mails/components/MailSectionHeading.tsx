import { cn } from '@/lib/utils';
import React from 'react';

type MailSectionHeadingProps = React.PropsWithChildren &
  React.HTMLProps<HTMLDivElement>;
const MailSectionHeading = ({
  children,
  className = '',
  ...props
}: MailSectionHeadingProps) => {
  return (
    <h2
      {...props}
      className={cn(
        `${className} text-lg md:text-xl xl:text-2xl capitalize pl-4 text-black font-semibold`
      )}
    >
      {children}
    </h2>
  );
};

export default MailSectionHeading;
