import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthProvider from './providers/AuthProvider';
import ProtectedPage from './providers/ProtectedPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedPage>
        <HomePage />
      </ProtectedPage>
    ),
  },
  {
    path: '/auth/login',
    element: <LoginPage />,
  },
  {
    path: '/auth/register',
    element: <RegisterPage />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
