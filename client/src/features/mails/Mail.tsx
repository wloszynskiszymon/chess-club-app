import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import MailNav from './panels/left/MailNav';
import NewMailPanel from './panels/NewMailPanel';
import useMailUrl from './hooks/useMailUrl';
import MiddlePanel from './panels/middle/MiddlePanel';
import MailDetails from './panels/right/MailDetails';

const Mail = () => {
  const { isNewMail } = useMailUrl();

  const navPanelSize = 20;
  const mainPanelSize = 80;

  return (
    <ResizablePanelGroup
      direction='horizontal'
      className='w-full rounded-lg border'
    >
      <ResizablePanel
        className='flex'
        minSize={15}
        defaultSize={navPanelSize}
        id='left-panel'
        order={1}
      >
        <MailNav />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        className='flex'
        defaultSize={mainPanelSize}
        id='main-panel'
        order={2}
      >
        {!isNewMail ? (
          <ResizablePanelGroup direction='horizontal'>
            <ResizablePanel
              className='h-full'
              minSize={25}
              defaultSize={30}
              id='middle-panel'
              order={1}
            >
              <MiddlePanel />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel
              className='h-full'
              minSize={25}
              defaultSize={70}
              id='right-panel'
              order={2}
            >
              <MailDetails />
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          <>
            <ResizableHandle />
            <NewMailPanel mainPanelSize={mainPanelSize} />
          </>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Mail;
