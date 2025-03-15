import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import MailNav from './panels/left/MailNav';
import useMailUrl from './hooks/useMailUrl';
import MiddlePanel from './panels/middle/MiddlePanel';
import MailDetails from './panels/right/MailDetails';
import MailForm from '@/components/forms/MailForm';

const Mail = () => {
  const { isNewMail } = useMailUrl();

  const navPanelSize = 20;
  const mainPanelSize = 80;

  return (
    <ResizablePanelGroup
      direction='horizontal'
      className='w-full rounded-lg border'
    >
      {/* Left Panel */}
      <ResizablePanel
        className='flex'
        minSize={15}
        maxSize={25}
        defaultSize={navPanelSize}
        id='left-panel'
        order={1}
      >
        <MailNav />
      </ResizablePanel>
      <ResizableHandle />
      {/* Main Panel */}
      <ResizablePanel
        className='flex'
        defaultSize={mainPanelSize}
        minSize={isNewMail ? 25 : 50}
        id='main-panel'
        order={2}
      >
        {isNewMail ? (
          <MailForm className='p-4' />
        ) : (
          <ResizablePanelGroup direction='horizontal'>
            <ResizablePanel
              className='h-full'
              minSize={25}
              defaultSize={35}
              id='middle-panel'
              order={1}
            >
              <MiddlePanel />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel
              className='h-full'
              minSize={40}
              defaultSize={65}
              id='right-panel'
              order={2}
            >
              <MailDetails />
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Mail;
