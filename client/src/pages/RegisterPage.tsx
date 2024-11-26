import RegisterForm from '../components/forms/RegisterForm';
import { Card } from '../components/ui/card';
import AppLayout from '../components/utils/AppLayout';

const RegisterPage = () => {
  return (
    <AppLayout className='flex-center'>
      <Card className='w-1/2 p-4 flex flex-col gap-4'>
        <h1 className='text-center font-bold text-2xl uppercase'>Sign up!</h1>
        <RegisterForm />
      </Card>
    </AppLayout>
  );
};

export default RegisterPage;
