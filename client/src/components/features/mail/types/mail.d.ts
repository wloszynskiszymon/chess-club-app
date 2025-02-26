export type Category = 'received' | 'saved' | 'sent';

export type MiddlePanelProps = {
  category: Category;
  mailId: string;
};
