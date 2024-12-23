import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const NumberSelect = ({ amount }: { amount: number }) => {
  return (
    <Select>
      <SelectTrigger className='w-20'>
        <SelectValue placeholder='0' />
      </SelectTrigger>
      <SelectContent className='w-20'>
        {Array.from({ length: amount }, (_, i) => (
          <SelectItem value={i + 1 + ''}>{i + 1}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default NumberSelect;
