import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import MailNav from './nav/MailNav';
import { Separator } from '@/components/ui/separator';
import MailListSection from './list/MailListSection';

const Mail = () => {
  return (
    <ResizablePanelGroup
      direction='horizontal'
      className='w-full  rounded-lg border'
    >
      {/* Left */}
      <ResizablePanel
        className='flex flex-col w-full h-full'
        minSize={20}
        defaultSize={20}
      >
        <div className='h-12 flex flex-col justify-center'>
          <h1 className='text-2xl capitalize pl-4 text-black font-semibold'>
            Mail
          </h1>
        </div>

        <Separator className='mb-4' />

        <MailNav />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={80}>
        <ResizablePanelGroup direction='horizontal'>
          <ResizablePanel className='h-full' defaultSize={25}>
            <MailListSection />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={55}>
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
