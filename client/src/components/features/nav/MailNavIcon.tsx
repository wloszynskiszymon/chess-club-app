import { MailIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MailNavIcon = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/mail');
  };

  return (
    <div className='relative cursor-pointer flex-center' onClick={handleClick}>
      <MailIcon width={25} height={25} />
      {/* TODO: Only visible when there's a message */}
      <div className='absolute -top-[4px] -right-[5px] size-3 rounded-full bg-orange-500 border border-white shadow-md'></div>
    </div>
  );
};

export default MailNavIcon;
