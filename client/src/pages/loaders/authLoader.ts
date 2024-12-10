import { redirect } from 'react-router-dom';
import api from '../../api/axios';

export async function checkIsNotAuthenticated() {
  try {
    const res = await api.get('/auth/refresh');
    if (res.status === 200) {
      return redirect('/');
    }
  } catch (e) {
    return null;
  }
}
