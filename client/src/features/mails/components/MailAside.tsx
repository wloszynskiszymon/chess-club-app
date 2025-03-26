import HeadingDescription from '@/components/utils/HeadingDescription';
import HeadingSecondary from '@/components/utils/HeadingSecondary';
import useMailsQuery from '@/hooks/queries/mail/useMailsQuery';
import MailItem from './MailItem';
import MailItemSkeleton from './skeleton/MailItemSkeleton';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

type MailAsideProps = React.HTMLProps<HTMLDivElement> & React.PropsWithChildren;
const MailAside = ({ className = '', ...props }: MailAsideProps) => {
  const { data: mailData, isLoading } = useMailsQuery({
    filter: 'received',
    limit: 5,
  });
  const navigate = useNavigate();

  return (
    <aside {...props} className={`${className} `}>
      <HeadingSecondary>Mails</HeadingSecondary>
      <HeadingDescription className='mb-3'>
        Your most recent mails
      </HeadingDescription>
      {isLoading &&
        Array.from({ length: 5 }).map((_, index) => (
          <MailItemSkeleton key={'mail-loading-' + index} />
        ))}

      {mailData?.length === 0 && (
        <div className='text-xs text-gray-400'>No content</div>
      )}

      {mailData?.map(mail => (
        <div className='[&:not(:last-child)]:border-b border-gray-200 cursor-pointer'>
          <MailItem key={mail.id} mail={mail} />
        </div>
      ))}
      {mailData && (
        <Button
          onClick={() => navigate('/mail/new')}
          className='w-full mt-4'
          variant='ghost'
        >
          New message
        </Button>
      )}
    </aside>
  );
};

export default MailAside;
