import { MailFilter } from '@/features/mails/types/mail';
import api from './axios';

export const getMails = async (filter: MailFilter) => {
  const res = await api.get('/api/mail?filter=' + filter);
  return res.data;
};

export const getMailDetails = async (mailId: string) => {
  const res = await api.get(`/api/mail/${mailId}`);
  return res.data.message;
};

export const getMailCounts = async () => {
  const res = await api.get('/api/mail/counts');
  return res.data;
};

export const saveMail = async (mailId: string) => {
  const res = await api.patch(`/api/mail/${mailId}/save`, { mailId });
  if (res.status === 204) return;
};

export const setMailAsRead = async (mailId: string) => {
  const res = await api.patch(`/api/mail/${mailId}/read`, { mailId });
  return res.data;
};
