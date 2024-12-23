import { TournamentSheetProps } from '../../types/sheet';
import TournamentForm from '../forms/TournamentForm';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { useState } from 'react';

const TournamentSheet = (
  props: TournamentSheetProps & React.PropsWithChildren
) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const closeSheet = () => setIsSheetOpen(false);

  const addTitle = 'Create a new tournament';
  const editTitle = 'Edit tournament';
  const title = props.formType === 'ADD' ? addTitle : editTitle;

  const addDescription =
    'Create your tournament here, all fields are required.';
  const editDescription =
    "Make changes to your tournament here. Click save when you're done.";
  const description =
    props.formType === 'ADD' ? addDescription : editDescription;

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>{props.children}</SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className='grid gap-4 py-4'>
          <TournamentForm {...props} onSubmitSuccess={closeSheet} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TournamentSheet;
