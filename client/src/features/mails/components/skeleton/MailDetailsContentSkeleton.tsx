import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const MailDetailsContentSkeleton = () => {
  return (
    <article className='flex-1 p-4'>
      <div className='w-full'>
        <div className='flex w-full justify-between items-center'>
          <Skeleton className='w-1/2 h-6 mb-3'></Skeleton>
        </div>
        <div className='flex items-center gap-2 '>
          <p>From:</p>
          <Skeleton className='w-1/3 h-4'></Skeleton>
        </div>
        <div className='flex items-center gap-2'>
          <p>To:</p>
          <Skeleton className='w-1/3 h-4'></Skeleton>
        </div>
      </div>

      <Separator orientation='horizontal' className='mt-2 mb-4' />

      <Skeleton className='w-full h-80'></Skeleton>
    </article>
  );
};

export default MailDetailsContentSkeleton;
