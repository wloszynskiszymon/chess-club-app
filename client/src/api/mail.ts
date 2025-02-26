import { NavCategory } from '@/components/features/mail/types/mail';
import api from './axios';

export const getMails = async (filter: NavCategory) => {
  const res = await api.get('/api/mail?filter=' + filter);
  return res.data;
};

export const getMailCounts = async () => {
  const res = await api.get('/api/mail/counts');
  return res.data;
};
