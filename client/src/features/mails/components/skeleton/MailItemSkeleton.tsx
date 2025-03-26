import { cn } from '@/lib/utils';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

type MailItemSkeletonProps = React.HTMLProps<HTMLDivElement>;
const MailItemSkeleton = ({
  className = '',
  ...props
}: MailItemSkeletonProps) => {
  return (
    <Skeleton {...props} className={cn(`${className} w-full h-20`)}></Skeleton>
  );
};

export default MailItemSkeleton;
