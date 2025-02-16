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

const mails = [
  {
    id: '1',
    from: 'Magnus Carlsen <magnus@chessmasters.com>',
    subject: 'Grandmaster Blitz Tournament!',
    body: 'Join the Grandmaster Blitz Tournament this weekend!\nDate: March 3, 2025\nTime: 5 PM GMT\nPrizes await the top 3 players.\n\nRegister now and showcase your skills!',
    date: '10 minutes ago',
  },
  {
    id: '2',
    from: 'Hikaru Nakamura <hikaru@speedchess.net>',
    subject: 'Speed Chess Challenge - Are you in?',
    body: 'The Speed Chess Challenge is back!\n\nFast-paced games, intense competition.\n- Entry Fee: Free\n- Date: March 5, 2025\n\nSign up now and test your reflexes.',
    date: '20 minutes ago',
  },
  {
    id: '3',
    from: 'Chess Titans League <contact@chesstitans.com>',
    subject: 'Chess Titans Spring Tournament',
    body: 'Spring is here, and so is the Titans Tournament!\n\nVenue: Online\nFormat: Rapid (15+10)\nSpots are limited. Secure yours today!',
    date: '1 hour ago',
  },
  {
    id: '4',
    from: 'Alireza Firouzja <alireza@rapidchess.org>',
    subject: 'Rapid Fire Tournament - Limited Slots!',
    body: 'Think fast, move faster.\n\nJoin the Rapid Fire Tournament:\n- Time Control: 10+5\n- Date: March 10, 2025\n\nDon’t miss out on the thrill!',
    date: '2 hours ago',
  },
  {
    id: '5',
    from: 'Fiona Steil-Antoni <fiona@chesscoverage.com>',
    subject: 'Commentary Invitational for Chess Enthusiasts',
    body: 'Not just for players!\n\nBe part of our live commentary team for the upcoming tournament.\nApply now to share your insights with thousands of viewers.',
    date: '3 hours ago',
  },
  {
    id: '6',
    from: 'Chess Club Online <events@chessclubonline.com>',
    subject: 'Weekly Club Tournament Registration Open!',
    body: 'Hello Chess Enthusiast,\n\nOur weekly tournament registration is now open.\n\nDetails:\n- Format: Swiss, 5 Rounds\n- Date: Every Saturday\n\nJoin, play, and improve!',
    date: '4 hours ago',
  },
  {
    id: '7',
    from: 'Judith Polgar <judith@chesslegends.com>',
    subject: 'Legends Invitational - Register Now!',
    body: 'Play against legends in our Invitational Tournament.\n\nExclusive to 100 participants.\nSign up now to secure your spot!',
    date: '5 hours ago',
  },
  {
    id: '8',
    from: 'Online Chess Arena <arena@onlinechess.com>',
    subject: 'Arena Blitz Night - Tonight!',
    body: 'Arena Blitz Night is happening tonight!\n\n- Format: Blitz 3+2\n- Time: 7 PM GMT\n\nJoin anytime during the event and climb the leaderboard.',
    date: '6 hours ago',
  },
  {
    id: '9',
    from: 'Fabiano Caruana <fabiano@prochessleague.com>',
    subject: 'Pro Chess League - Mid-Season Update',
    body: 'Mid-season updates are here!\n\nCheck out the latest standings, player stats, and upcoming match schedules.\nStay informed, stay sharp.',
    date: '7 hours ago',
  },
  {
    id: '10',
    from: 'Chess Open Series <info@chessopenseries.org>',
    subject: 'Global Open Registration Now Live!',
    body: 'The Global Open is back!\n\n- Prize Pool: $50,000\n- Open to all skill levels\n\nDon’t miss the biggest open tournament of the year. Register today!',
    date: '8 hours ago',
  },
];

const Mail = () => {
  const location = useLocation();

  const isNewMail = location.pathname === '/mail/new';

  const { data } = useQuery({
    queryKey: ['mail'],
    queryFn: async () => {
      const res = await api.get('/api/mail');
      return res.data;
    },
  });

  console.log(data);

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
            <MailListSection mails={mails} />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel minSize={40} defaultSize={55}>
            {!isNewMail && <MailDetails mails={mails} />}
            {isNewMail && <MailForm className='p-4' />}
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Mail;
