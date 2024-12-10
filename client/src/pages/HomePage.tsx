import { useState } from 'react';
import api from '../api/axios';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [result, setResult] = useState();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const { data } = await api.get('/auth/test');
      setResult(data.message);
    } catch (error: any) {
      setResult(error?.message);
    }
  };

  const handleLogout = async () => {
    const res = await api.get('/auth/logout');
    if (res.status === 200) {
      navigate('/auth/login', { replace: true });
    }
  };

  return (
    <div>
      <Button onClick={handleClick}>Test</Button>
      <Button onClick={handleLogout}>Logout</Button>
      <div>{result}</div>
    </div>
  );
};

export default HomePage;
