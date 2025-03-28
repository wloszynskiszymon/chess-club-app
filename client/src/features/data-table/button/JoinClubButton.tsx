import { Button } from '../../../components/ui/button';
import { Club } from '../columns/ClubListColumns';
import api from '../../../api/axios';
import { toast } from 'sonner';
import { isErrorMessage } from '../../../api/errors';
import { Row } from '@tanstack/react-table';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useJoinClubContext } from '../columns/JoinClubContext';

const JoinClubButton = ({ row }: { row: Row<Club> }) => {
  const { isJoining, setIsJoining } = useJoinClubContext();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['joinClub'],
    mutationFn: async (clubId: string) => {
      await api.post(`/api/club/${clubId}/join`, { clubId });
    },
    onMutate: () => {
      setIsJoining(true);
    },
    onSuccess: async () => {
      toast.success('You have joined the club!');
      await queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: error => {
      if (isErrorMessage(error)) toast.error(error.message);
      else toast.error('Failed to join the club!');
    },
    onSettled: () => {
      setIsJoining(false);
    },
  });

  return (
    <Button
      variant='outline'
      onClick={() => mutate(row.original.id)}
      disabled={isJoining || isPending}
    >
      {isPending ? 'Joining...' : 'Join'}
    </Button>
  );
};

export default JoinClubButton;
