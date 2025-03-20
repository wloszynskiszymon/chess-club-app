import AuthFooter from '@/components/utils/AuthFooter';
import RegisterForm from '../components/forms/RegisterForm';
import { Card } from '../components/ui/card';
import AppLayout from '../components/utils/AppLayout';
import Logo from '@/features/nav/Logo';

const RegisterPage = () => {
  return (
    <AppLayout className='flex-center flex-col gap-12 px-4'>
      <header>
        <Logo className='w-[15rem] lg:w-[20rem]' />
      </header>
      <Card className='w-full max-w-[30rem] h-full p-4'>
        <h1 className='font-bold text-xl uppercase text-center mb-4'>
          Registration
        </h1>
        <RegisterForm />
      </Card>
      <AuthFooter />
    </AppLayout>
  );
};

export default RegisterPage;
