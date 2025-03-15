import { LucideIcon } from 'lucide-react';

import { appConfig } from '@/lib/config';

export type MailFilter = (typeof appConfig.mail.filters)[number];

export type MailMiddlePanelProps = {
  activeMailId: string;
};

export type MailLink = {
  icon: LucideIcon;
  title: string;
  label?: string;
  url: string;
  prefetch: () => void;
};

export type Recipient = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type MailRecipientEntry = {
  id: string;
  isRead: boolean;
  isArchived: boolean;
  isDeleted: boolean;
  isSaved: boolean;
  recipient: Recipient;
};

export type Mail = {
  id: string;
  subject: string;
  body: string;
  senderId: string;
  sender: Recipient;
  parent: Mail | null;
  replies: Mail[];
  recipients: MailRecipientEntry[];
  isForwarded: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  createdAt: Date;
};

export type MailsCounts = {
  total: number;
  unread: number;
  saved: number;
  sent: number;
};

export type GetMailParams = {
  filter: MailFilter;
  query?: string;
  search?: string;
  page?: number;
  limit?: number;
};
