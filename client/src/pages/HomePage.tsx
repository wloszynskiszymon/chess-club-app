import { useState } from 'react';
import api from '../api/axios';

const HomePage = () => {
  const [result, setResult] = useState();

  const handleClick = async () => {
    try {
      const { data } = await api.get('/auth/test');
      setResult(data.message);
    } catch (error: any) {
      setResult(error?.message);
    }
  };
  // Protected page
  return (
    <div>
      <button onClick={handleClick}>Test</button>
      <div>{result}</div>
    </div>
  );
};

export default HomePage;
