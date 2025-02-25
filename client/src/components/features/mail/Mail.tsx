import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import MailNav from './nav/MailNav';
import MailListSection from './list/MailListSection';
import MailDetails from './details/MailDetails';
import MailForm from '@/components/forms/MailForm';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '@/api/axios';
import { Message } from '@/types/mail';

const Mail = () => {
  const location = useLocation();

  const isNewMail = location.pathname === '/mail/new';

  const { data } = useQuery<Message[]>({
    queryKey: ['mails'],
    queryFn: async () => {
      const res = await api.get('/api/mail');
      return res.data;
    },
    notifyOnChangeProps: 'all',
  });

  return (
    <ResizablePanelGroup
      direction='horizontal'
      className='w-full rounded-lg border'
    >
      {/* Left */}
      <ResizablePanel className='flex' minSize={15} defaultSize={20}>
        <MailNav />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={80}>
        <ResizablePanelGroup direction='horizontal'>
          <ResizablePanel className='h-full' minSize={25} defaultSize={25}>
            {data && <MailListSection mails={data} />}
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel minSize={40} defaultSize={55}>
            {!isNewMail && data && <MailDetails mails={data} />}
            {isNewMail && <MailForm className='p-4' />}
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Mail;
