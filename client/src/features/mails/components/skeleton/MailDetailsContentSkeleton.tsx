import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const MailDetailsContentSkeleton = () => {
  return (
    <article className='flex-1 p-4'>
      <div className='w-full'>
        <div className='flex w-full justify-between items-center'>
          <Skeleton className='w-1/2 h-8 mb-3'></Skeleton>
          <Skeleton className='w-24 h-4'></Skeleton>
        </div>
        <div className='flex items-center gap-2 '>
          <p className='text-sm text-muted-foreground'>From:</p>
          <Skeleton className='w-1/3 h-4'></Skeleton>
        </div>
        <div className='flex items-center gap-2'>
          <p className='text-sm text-muted-foreground'>To:</p>
          <Skeleton className='w-1/3 h-4'></Skeleton>
        </div>
      </div>

      <Separator orientation='horizontal' className='mt-2 mb-4' />

      <Skeleton className='w-full h-80'></Skeleton>
    </article>
  );
};

export default MailDetailsContentSkeleton;
