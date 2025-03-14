import { NavCategory } from '@/features/mails/types/mail';
import { LucideIcon } from 'lucide-react';

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

export type MessageRecipientEntry = {
  id: string;
  isRead: boolean;
  isArchived: boolean;
  isDeleted: boolean;
  isSaved: boolean;
  recipient: Recipient;
};

export type Message = {
  id: string;
  subject: string;
  body: string;
  senderId: string;
  sender: Recipient;
  parent: Message | null;
  replies: Message[];
  recipients: MessageRecipientEntry[];
  isForwarded: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  createdAt: Date;
};

export type MessageCounts = {
  total: number;
  unread: number;
  saved: number;
  sent: number;
};

export type MailFilters = {
  type: NavCategory;
  search?: string;
  page?: number;
  limit?: number;
};
