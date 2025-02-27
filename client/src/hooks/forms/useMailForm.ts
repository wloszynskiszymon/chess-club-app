import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { handleServerValidationErrors } from '../../api/errors';
import { mailSchema, MailSchema } from '@/schemas/mailSchema';
import api from '@/api/axios';
import { toast } from 'sonner';

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
      const res = await api.post('/api/mail/send', data);
      if (res.status === 201) {
        form.reset();
        toast.success('Mail sent successfully!');
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as unknown;

      handleServerValidationErrors<MailSchema>(errorData, form.setError);
    }
  };

  return { form, handleSubmit };
};

export default useMailForm;
