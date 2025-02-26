import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { Category } from '../types/mail';

type SearchMailInputProps = {
  type: Category;
};
const SearchMailInput = ({ type }: SearchMailInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    console.log(type);
  };

  return (
    <div className='relative w-full'>
      <SearchIcon className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
      <Input onChange={handleChange} placeholder='Search...' className='pl-8' />
    </div>
  );
};

export default SearchMailInput;
