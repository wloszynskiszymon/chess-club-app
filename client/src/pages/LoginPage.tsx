import { useEffect } from 'react';
import LoginForm from '../components/forms/LoginForm';
import { Card } from '../components/ui/card';
import AppLayout from '../components/utils/AppLayout';
import { queryClient } from '@/App';
import useAuth from '@/hooks/useAuth';

const LoginPage = () => {
  const { setToken } = useAuth();

  useEffect(() => {
    queryClient.cancelQueries();
    queryClient.clear();
    setToken(undefined);
  }, []);

  return (
    <AppLayout className='flex-center'>
      <Card className='w-[30rem] h-full p-4'>
        <h1 className='text-center font-bold text-2xl uppercase'>Sign in!</h1>
        <LoginForm />
      </Card>
    </AppLayout>
  );
};

export default LoginPage;
