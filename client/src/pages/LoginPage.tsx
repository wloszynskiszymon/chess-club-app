import LoginForm from '../components/forms/LoginForm';
import { Card } from '../components/ui/card';
import AppLayout from '../components/utils/AppLayout';

const LoginPage = () => {
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
