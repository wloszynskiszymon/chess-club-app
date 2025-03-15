import { Mail } from '@/types/mail';
import React from 'react';
import MailSectionHeader from '../../components/MailSectionHeader';
import MailSectionHeading from '../../components/MailSectionHeading';
import SaveButton from './SaveButton';
import useMailUrl from '../../hooks/useMailUrl';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

type MailDetailsLayoutProps = {
  children?: React.ReactNode;
  mail?: Mail;
  renderSkeleton?: boolean;
};

const MailDetailsLayout = ({
  children,
  mail,
  renderSkeleton = false,
}: MailDetailsLayoutProps) => {
  const { category } = useMailUrl();
  return (
    <section>
      <MailSectionHeader className='flex justify-between items-center'>
        <MailSectionHeading>Content of your mail</MailSectionHeading>

        <div className='flex justify-between items-center pr-6'>
          {!renderSkeleton && category !== 'sent' && mail && (
            <SaveButton mail={mail} />
          )}
          {renderSkeleton && <Skeleton className='w-6 h-6' />}
        </div>
      </MailSectionHeader>

      <Separator />

      {children}
    </section>
  );
};

export default MailDetailsLayout;
