import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

type MildCardSkeletonProps = React.HTMLProps<HTMLDivElement>;

const MildCardSkeleton = ({
  className = '',
  ...props
}: MildCardSkeletonProps) => {
  return <Skeleton {...props} className={cn(`${className} h-28`)}></Skeleton>;
};

export default MildCardSkeleton;
