import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthProvider from './providers/AuthProvider';
import ProtectedPage from './providers/ProtectedPage';
import {
  checkIsAuthenticated,
  checkIsNotAuthenticated,
} from './pages/loaders/authLoader';
import { Toaster } from './components/ui/sonner';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedPage>
        <HomePage />
      </ProtectedPage>
    ),
    loader: checkIsAuthenticated,
  },
  {
    path: '/auth/login',
    element: <LoginPage />,
    loader: checkIsNotAuthenticated,
  },
  {
    path: '/auth/register',
    element: <RegisterPage />,
    loader: checkIsNotAuthenticated,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster theme='light' richColors position='top-center' />
    </AuthProvider>
  );
}

export default App;
