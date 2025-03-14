import { Message } from '@/types/mail';
import React from 'react';
import MailSectionHeader from '../../components/MailSectionHeader';
import MailSectionHeading from '../../components/MailSectionHeading';
import SaveButton from './SaveButton';
import useMailUrl from '../../hooks/useMailUrl';
import { Separator } from '@/components/ui/separator';

type MailDetailsLayoutProps = {
  children?: React.ReactNode;
  mail?: Message;
};

const MailDetailsLayout = ({ children, mail }: MailDetailsLayoutProps) => {
  const { category } = useMailUrl();
  return (
    <section>
      <MailSectionHeader className='flex justify-between items-center'>
        <MailSectionHeading>Content of your mail</MailSectionHeading>

        <div className='flex justify-between items-center'>
          {category !== 'sent' && mail && <SaveButton mail={mail} />}
        </div>
      </MailSectionHeader>

      <Separator />

      {children}
    </section>
  );
};

export default MailDetailsLayout;
