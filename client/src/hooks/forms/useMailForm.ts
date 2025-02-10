import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { handleServerValidationErrors } from '../../utils/errors';
import { mailSchema, MailSchema } from '@/schemas/mailSchema';

const useMailForm = () => {
  const form = useForm<MailSchema>({
    defaultValues: {
      to: '',
      subject: '',
      body: '',
    },
    resolver: zodResolver(mailSchema),
  });

  const handleSubmit = async (data: MailSchema) => {
    try {
      console.log(data);
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as unknown;

      handleServerValidationErrors<MailSchema>(errorData, form.setError);
    }
  };

  return { form, handleSubmit };
};

export default useMailForm;
