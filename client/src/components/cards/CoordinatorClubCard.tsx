import ClubForm from '../forms/ClubForm';
import { Card } from '../ui/card';

const CoordinatorClubCard = () => {
  return (
    <Card className='p-4 w-[30rem]'>
      <h1 className='text-2xl uppercase font-bold'>Before we start</h1>
      <p className='text-sm text-gray-600 mb-4'>
        Welcome to the ChessMate! As a coordinator, you must first create your
        chess club before you can start using the app. Your club name must be
        unique and can't be changed later.
      </p>
      <ClubForm />
    </Card>
  );
};

export default CoordinatorClubCard;
