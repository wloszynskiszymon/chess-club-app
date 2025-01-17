export type Participant = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'COORDINATOR' | 'CHESS_PLAYER';
};

export type ParticipantResult = {
  participantId: string;
  wins: number;
  losses: number;
  draws: number;
  rating: number;
};

export type ParticipantWithResults = Participant & {
  results: ParticipantResult[] | [];
};

export type Tournament = {
  id: string;
  title: string;
  description: string;
  datetime: Date;
  rounds: number;
  participants: ParticipantWithResults[];
};
