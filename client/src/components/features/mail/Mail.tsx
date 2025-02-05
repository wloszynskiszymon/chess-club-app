import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import MailNav from './nav/MailNav';
import { Separator } from '@/components/ui/separator';

const Mail = () => {
  return (
    <ResizablePanelGroup
      direction='horizontal'
      className='w-full min-h-[80vh] rounded-lg border'
    >
      {/* Left */}
      <ResizablePanel className='flex flex-col' minSize={20} defaultSize={10}>
        <div className='flex-shrink-1'>
          <h1 className='text-2xl capitalize px-4 mt-2 text-black font-semibold'>
            Your mailbox
          </h1>
          <p className='text-sm px-4 mt-2 text-gray-500'>
            Here you can see all your messages!
          </p>
        </div>

        <Separator className='my-4' />

        <MailNav />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction='vertical'>
          <ResizablePanel defaultSize={25}>
            <div className='flex h-full items-center justify-center p-6'>
              <span className='font-semibold'>Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={75}>
            <div className='flex h-full items-center justify-center p-6'>
              <span className='font-semibold'>Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Mail;
