import HeadingDescription from '@/components/utils/HeadingDescription';
import HeadingSecondary from '@/components/utils/HeadingSecondary';
import useMailsQuery from '@/hooks/queries/mail/useMailsQuery';
import MailItem from './MailItem';
import MailItemSkeleton from './skeleton/MailItemSkeleton';

type MailAsideProps = React.HTMLProps<HTMLDivElement> & React.PropsWithChildren;
const MailAside = ({ className = '', ...props }: MailAsideProps) => {
  const { data: mailData, isLoading } = useMailsQuery({
    filter: 'received',
    limit: 5,
  });

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
        <div className='[&:not(:last-child)]:border-b border-gray-200'>
          <MailItem key={mail.id} mail={mail} />
        </div>
      ))}
    </aside>
  );
};

export default MailAside;
