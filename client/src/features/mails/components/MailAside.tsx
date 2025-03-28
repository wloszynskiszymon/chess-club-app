import HeadingDescription from '@/components/utils/HeadingDescription';
import HeadingSecondary from '@/components/utils/HeadingSecondary';
import useMailsQuery from '@/hooks/queries/mail/useMailsQuery';
import MailItemSkeleton from './skeleton/MailItemSkeleton';
import NewMessageButtonLink from '../panels/left/NewMessageButtonLink';
import MildCard from '@/components/utils/MildCard';

type MailAsideProps = React.HTMLProps<HTMLDivElement> & React.PropsWithChildren;
const MailAside = ({ className = '', ...props }: MailAsideProps) => {
  const { data: mailData, isLoading } = useMailsQuery({
    filter: 'received',
    limit: 3,
  });

  return (
    <aside {...props} className={`${className} max-w-[600px]`}>
      <HeadingSecondary className='mt-4'>Mails</HeadingSecondary>
      <HeadingDescription className='mb-4'>
        Your most recent mails
      </HeadingDescription>
      <div className='flex flex-col gap-4'>
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <MailItemSkeleton key={'mail-loading-' + index} />
          ))}

        {mailData?.length === 0 && (
          <div className='text-sm text-muted-foreground text-center my-4'>
            No content
          </div>
        )}

        {mailData?.map(mail => (
          <MildCard
            key={mail.id}
            className='cursor-pointer'
            title={mail.subject}
            description={mail.body}
            footer={mail.sender.email}
          />
        ))}
        {mailData && (
          <NewMessageButtonLink
            buttonVariantsObject={{
              variant: 'ghost',
              size: 'sm',
            }}
            className='w-full mt-4'
          />
        )}
      </div>
    </aside>
  );
};

export default MailAside;
