import { cn } from '@/lib/utils';
import moment from 'moment';
import React from 'react';

type MailDateProps = React.PropsWithChildren &
  React.HTMLProps<HTMLDivElement> & {
    date: string;
    format?: 'normal' | 'ago';
  };
const MailDate = ({
  children,
  format = 'normal',
  date,
  className = '',
  ...props
}: MailDateProps) => {
  const dateNormal = moment(date).format('DD.MM.YYYY');
  const dateAgo = moment(date).fromNow();
  return (
    <p
      {...props}
      className={cn(`${className} text-gray-500 text-xs md:text-sm`)}
    >
      {format === 'normal' ? dateNormal : dateAgo}
    </p>
  );
};

export default MailDate;
