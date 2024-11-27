import React from 'react';
import { cn } from '../../lib/utils';

type ErrorMessageProps = React.PropsWithChildren &
  React.HTMLProps<HTMLParagraphElement>;
const ErrorMessage = ({
  children,
  className = '',
  ...props
}: ErrorMessageProps) => {
  return (
    <p
      {...props}
      className={cn(`text-destructive text-xs h-2 italic ${className} `)}
    >
      {children}
    </p>
  );
};

export default ErrorMessage;
