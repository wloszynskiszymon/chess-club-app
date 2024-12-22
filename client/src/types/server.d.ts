export type Tournament = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  rounds: string;
  participants: {
    user: Participant;
  }[];
};

export type Participant = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'COORDINATOR' | 'CHESS_PLAYER';
};
