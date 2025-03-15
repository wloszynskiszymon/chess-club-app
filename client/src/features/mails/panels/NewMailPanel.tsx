import { ResizablePanel } from '@/components/ui/resizable';
import MailForm from '@/components/forms/MailForm';

const NewMailPanel = ({ mainPanelSize }: { mainPanelSize: number }) => {
  return (
    <ResizablePanel
      minSize={mainPanelSize / 2}
      defaultSize={mainPanelSize}
      id='new-mail-panel'
      order={3}
    >
      <MailForm className='p-4' />
    </ResizablePanel>
  );
};

export default NewMailPanel;
