import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import MailNav from './components/MailNav';
import MiddlePanel from './panels/middle/MiddlePanel';
import RightPanel from './panels/right/RightPanel';
import useMailUrl from './hooks/useMailUrl';

const Mail = () => {
  const { isNewMail } = useMailUrl();
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
          {!isNewMail && (
            <ResizablePanel className='h-full' minSize={25} defaultSize={25}>
              <MiddlePanel />
            </ResizablePanel>
          )}
          <ResizableHandle />
          <ResizablePanel
            minSize={isNewMail ? 80 : 40}
            defaultSize={isNewMail ? 80 : 55}
          >
            <RightPanel />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Mail;
