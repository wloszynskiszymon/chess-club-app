import { LucideIcon } from 'lucide-react';

export type MailLink = {
  icon: LucideIcon;
  title: string;
  label: string;
  url: string;
};

export type MailContent = {
  id: string;
  from: string;
  subject: string;
  body: string;
  date: string;
};
export type Mail = {
  id: string;
  from: string;
  subject: string;
  body: string;
  date: string;
  recipients: { recipientId: string }[];
};
