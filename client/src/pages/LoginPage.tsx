import Logo from '@/features/nav/Logo';
import LoginForm from '../components/forms/LoginForm';
import { Card } from '../components/ui/card';
import AppLayout from '../components/utils/AppLayout';
import AuthFooter from '@/components/utils/AuthFooter';

const LoginPage = () => {
  return (
    <AppLayout className='flex-center flex-col gap-12'>
      <header>
        <Logo className='w-[20rem]' />
      </header>
      <Card className='w-[30rem] h-full p-4'>
        <h1 className='text-center font-bold text-xl uppercase mb-4'>Login</h1>
        <LoginForm />
      </Card>
      <AuthFooter />
    </AppLayout>
  );
};

export default LoginPage;
