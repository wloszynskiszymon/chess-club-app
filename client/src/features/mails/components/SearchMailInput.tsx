import { Input } from '@/components/ui/input';
import { SearchIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { NavCategory } from '../types/mail';

const SearchInput = ({ mailType }: { mailType: NavCategory }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query) {
        searchParams.set('q', query);
      }
      setSearchParams(searchParams, { replace: true });
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, searchParams, setSearchParams]);

  useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    setQuery(urlQuery);
  }, [searchParams]);

  useEffect(() => {
    if (isFocused && !searchParams.has('q')) {
      searchParams.set('q', '');
      setSearchParams(searchParams, { replace: true });
    }
  }, [isFocused, searchParams, setSearchParams]);

  const clearQuery = () => {
    searchParams.delete('q');
    setSearchParams(searchParams, { replace: true });
    setQuery('');
  };

  return (
    <div className='relative w-full'>
      <SearchIcon className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
      <Input
        value={query}
        className='pl-8'
        onChange={e => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder='Search...'
      />
      <XIcon
        className={`absolute right-2 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer ${
          searchParams.has('q') ? 'block' : 'hidden'
        }`}
        onClick={clearQuery}
      />
    </div>
  );
};

export default SearchInput;
