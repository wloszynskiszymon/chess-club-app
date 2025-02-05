import { cn } from '@/lib/utils';
import React from 'react';

type MailSectionHeaderProps = React.PropsWithChildren &
  React.HTMLProps<HTMLDivElement>;
const MailSectionHeader = ({
  children,
  className = '',
  ...props
}: MailSectionHeaderProps) => {
  return (
    <div {...props} className={cn(`${className} h-12 flex items-center `)}>
      {children}
    </div>
  );
};

export default MailSectionHeader;
