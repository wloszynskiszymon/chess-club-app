import { Tournament } from './server';

export type TournamentSheetProps =
  | {
      formType: 'ADD';
      tournament?: never;
      onSubmitSuccess?: () => void;
    }
  | {
      formType: 'EDIT';
      tournament: Tournament;
      onSubmitSuccess?: () => void;
    };
