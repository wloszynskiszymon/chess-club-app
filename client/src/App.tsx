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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TournamentsPage from './pages/TournamentsPage';

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
  {
    path: '/tournaments',
    element: (
      <ProtectedPage>
        <TournamentsPage />
      </ProtectedPage>
    ),
    loader: checkIsAuthenticated,
  },
]);

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster theme='light' richColors position='top-center' />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
