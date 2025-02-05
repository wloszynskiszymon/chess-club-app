import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Mail } from '@/types/mail';
import { SearchIcon } from 'lucide-react';
import MailsList from './MailsList';

const mails: Mail[] = [
  {
    id: '1',
    from: 'Andrzej Sum - the greatest of all time pro epic player you know 2000',
    subject: 'New tournament, join right now!',
    body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime nam, neque nemo officiis cum eius nulla dolore tenetur doloremque quidem recusandae. Incidunt modi commodi impedit quo alias. Dignissimos, excepturi repudiandae! Incidunt minus blanditiis sit cum dolor sapiente error, praesentium numquam tempore, nesciunt eius aliquid ducimus quos! Quibusdam tenetur voluptatum impedit accusantium necessitatibus harum optio magnam ab mollitia! Commodi, ab aut.',
    date: '15 minutes ago',
  },
  {
    id: '2',
    from: 'John Doe',
    subject: 'New tournament, join right now!',
    body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime nam, neque nemo officiis cum eius nulla dolore tenetur doloremque quidem recusandae. Incidunt modi commodi impedit quo alias. Dignissimos, excepturi repudiandae! Incidunt minus blanditiis sit cum dolor sapiente error, praesentium numquam tempore, nesciunt eius aliquid ducimus quos! Quibusdam tenetur voluptatum impedit accusantium necessitatibus harum optio magnam ab mollitia! Commodi, ab aut.',
    date: '15 minutes ago',
  },
  {
    id: '3',
    from: 'Michael Jordan',
    subject: 'New tournament, join right now!',
    body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime nam, neque nemo officiis cum eius nulla dolore tenetur doloremque quidem recusandae. Incidunt modi commodi impedit quo alias. Dignissimos, excepturi repudiandae! Incidunt minus blanditiis sit cum dolor sapiente error, praesentium numquam tempore, nesciunt eius aliquid ducimus quos! Quibusdam tenetur voluptatum impedit accusantium necessitatibus harum optio magnam ab mollitia! Commodi, ab aut.',
    date: '15 minutes ago',
  },
  {
    id: '4',
    from: 'Donald Trump',
    subject: 'New tournament, join right now!',
    body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime nam, neque nemo officiis cum eius nulla dolore tenetur doloremque quidem recusandae. Incidunt modi commodi impedit quo alias. Dignissimos, excepturi repudiandae! Incidunt minus blanditiis sit cum dolor sapiente error, praesentium numquam tempore, nesciunt eius aliquid ducimus quos! Quibusdam tenetur voluptatum impedit accusantium necessitatibus harum optio magnam ab mollitia! Commodi, ab aut.',
    date: '15 minutes ago',
  },
  {
    id: '5',
    from: 'Joe Biden',
    subject: 'New tournament, join right now!',
    body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime nam, neque nemo officiis cum eius nulla dolore tenetur doloremque quidem recusandae. Incidunt modi commodi impedit quo alias. Dignissimos, excepturi repudiandae! Incidunt minus blanditiis sit cum dolor sapiente error, praesentium numquam tempore, nesciunt eius aliquid ducimus quos! Quibusdam tenetur voluptatum impedit accusantium necessitatibus harum optio magnam ab mollitia! Commodi, ab aut.',
    date: '15 minutes ago',
  },
  {
    id: '6',
    from: 'Joenald Bidtrump',
    subject: 'New tournament, join right now!',
    body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime nam, neque nemo officiis cum eius nulla dolore tenetur doloremque quidem recusandae. Incidunt modi commodi impedit quo alias. Dignissimos, excepturi repudiandae! Incidunt minus blanditiis sit cum dolor sapiente error, praesentium numquam tempore, nesciunt eius aliquid ducimus quos! Quibusdam tenetur voluptatum impedit accusantium necessitatibus harum optio magnam ab mollitia! Commodi, ab aut.',
    date: '15 minutes ago',
  },
];

const MailListSection = () => {
  return (
    <section className='h-full'>
      <div className='h-12 flex items-center'>
        <h1 className='text-2xl capitalize pl-4 text-black font-semibold'>
          Your inbox
        </h1>
      </div>

      <Separator />
      <div className='px-2 my-4'>
        <div className='relative w-full'>
          <SearchIcon className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input placeholder='Search' className='pl-8' />
        </div>
      </div>
      <MailsList mails={mails} />
    </section>
  );
};

export default MailListSection;
