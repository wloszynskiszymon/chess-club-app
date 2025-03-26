import useTournamentParticipantsForm from '../../hooks/forms/useTournamentParticipantsForm';
import ParticipantsTable from '../tournaments/ParticipantsTable';
import { Tournament } from '../../types/server';
import { Button } from '../ui/button';
import { Form } from '../ui/form';

type TournamentParticipantsTableFormProps = {
  tournament: Tournament;
};

const TournamentParticipantsTableForm = ({
  tournament,
}: TournamentParticipantsTableFormProps) => {
  const { form, handleSubmit } = useTournamentParticipantsForm(tournament);

  return (
    <Form {...form}>
      <form
        className='flex flex-col w-full'
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className='w-full flex flex-col justify-between items-center'>
          <Button
            type='submit'
            className='self-end'
            disabled={form.formState.isSubmitting || !form.formState.isDirty}
          >
            Save
          </Button>
        </div>

        <ParticipantsTable tournament={tournament} />
      </form>
    </Form>
  );
};

export default TournamentParticipantsTableForm;
