import MailCardSkeleton from './MailCardSkeleton';

const MailListSkeleton = ({ amount }: { amount: number }) => {
  const array = new Array(amount).fill(0);
  return array.map((_, index) => <MailCardSkeleton key={index} />);
};

export default MailListSkeleton;
