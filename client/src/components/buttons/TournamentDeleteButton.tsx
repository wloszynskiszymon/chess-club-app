import { PropsWithChildren, useState } from 'react';
import { Button } from '../ui/button';
import api from '../../api/axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import useTournamentsQuery from '../../hooks/queries/useTournamentsQuery';

type TournamentDeleteButtonProps = PropsWithChildren & {
  tournamentId: string;
  shouldNavigate?: boolean;
  navigatePath?: string;
};

const TournamentDeleteButton = ({
  tournamentId,
  shouldNavigate = true,
  navigatePath = '/tournaments',
  children = 'Delete',
}: TournamentDeleteButtonProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { refetch } = useTournamentsQuery();

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await api.delete(`/api/tournament/${tournamentId}`);
      await refetch();
      toast.success(res.data.message);
      if (shouldNavigate) navigate(navigatePath);
      setOpen(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete the tournament. Please try again.');
    }
  };

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' aria-label='Delete tournament'>
          {children}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            tournament and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant='destructive'
            aria-label='Confirm delete tournament'
            onClick={handleDelete}
            disabled={loading}
            className='text-white bg-red-600 hover:bg-red-700 focus:ring-red-500'
          >
            {loading ? 'Deleting tournament...' : 'Delete tournament'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TournamentDeleteButton;
