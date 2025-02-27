import { Button } from '../../../components/ui/button';
import { Club } from '../columns/ClubListColumns';
import api from '../../../api/axios';
import { toast } from 'sonner';
import { isErrorMessage } from '../../../api/errors';
import { Row } from '@tanstack/react-table';
import useUserQuery from '../../../hooks/queries/useUserQuery';
import { useMutation } from '@tanstack/react-query';
import { useJoinClubContext } from './JoinClubContext';

const JoinClubButton = ({ row }: { row: Row<Club> }) => {
  const { refetch: refetchUserData, isFetching: isFetchingUserData } =
    useUserQuery();
  const { isJoining, setIsJoining } = useJoinClubContext();

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
      await refetchUserData();
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
      disabled={isJoining || isPending || isFetchingUserData}
    >
      {isPending ? 'Joining...' : 'Join'}
    </Button>
  );
};

export default JoinClubButton;
