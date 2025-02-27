export type NavCategory = 'received' | 'saved' | 'sent';

export type MiddlePanelProps = {
  category: NavCategory & 'new';
  mailId: string;
};
