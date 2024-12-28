import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { FormControl, FormField } from '../ui/form';
import { useFormContext } from 'react-hook-form';

type NumberSelectProps = {
  name: string;
  amount: number;
};

const NumberSelect = ({ name, amount }: NumberSelectProps) => {
  const form = useFormContext();

  if (!form) {
    throw new Error('useFormContext should be used within <Form>');
  }

  //  <SelectValue>{field.value}</SelectValue> - needed, because 0 is falsy and won't be displayed - probably a bug in the library or smth
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <Select
          onValueChange={value => field.onChange(Number(value))}
          value={field.value + ''}
        >
          <FormControl>
            <SelectTrigger className='w-20'>
              <SelectValue>{field.value}</SelectValue>
            </SelectTrigger>
          </FormControl>
          <SelectContent className='w-20'>
            {Array.from({ length: amount + 1 }, (_, i) => (
              <SelectItem key={name + '-' + i} value={i + ''}>
                {i}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default NumberSelect;
