import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import MailNav from './nav/MailNav';
import MailDetails from './details/MailDetails';
import MailForm from '@/components/forms/MailForm';
import { useLocation } from 'react-router-dom';
import useMessagesQuery from '@/hooks/queries/useMessagesQuery';
import useMessageCountsQuery from '@/hooks/queries/useMessagesCountsQuery';
import MiddlePanel from './panels/middle/MiddlePanel';

const Mail = () => {
  const location = useLocation();

  const isNewMail = location.pathname === '/mail/new';

  const { data: messagesData } = useMessagesQuery({ type: 'received' });
  const { data: countsData } = useMessageCountsQuery();

  console.log(messagesData);
  console.log(countsData);

  return (
    <ResizablePanelGroup
      direction='horizontal'
      className='w-full rounded-lg border'
    >
      {/* Left */}
      <ResizablePanel className='flex' minSize={15} defaultSize={20}>
        {countsData && <MailNav counts={countsData} />}
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={80}>
        <ResizablePanelGroup direction='horizontal'>
          <ResizablePanel className='h-full' minSize={25} defaultSize={25}>
            <MiddlePanel />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel minSize={40} defaultSize={55}>
            {!isNewMail && messagesData && <MailDetails mails={messagesData} />}
            {isNewMail && <MailForm className='p-4' />}
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Mail;
