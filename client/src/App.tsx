import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthProvider from './providers/AuthProvider';
import ProtectedPage from './providers/ProtectedPage';
import { Toaster } from './components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TournamentsPage from './pages/TournamentsPage';
import TournamentDetailsPage from './pages/TournamentDetailsPage';
import AuthPage from './providers/AuthPage';
import MailPage from './pages/MailPage';

// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
    element: (
      <AuthPage>
        <LoginPage />
      </AuthPage>
    ),
  },
  {
    path: '/auth/register',
    element: (
      <AuthPage>
        <RegisterPage />
      </AuthPage>
    ),
  },
  {
    path: '/tournaments',
    element: (
      <ProtectedPage>
        <TournamentsPage />
      </ProtectedPage>
    ),
  },
  {
    path: '/tournament/:tournamentId',
    element: (
      <ProtectedPage>
        <TournamentDetailsPage />
      </ProtectedPage>
    ),
  },
  {
    path: '/mail/:category',
    element: (
      <ProtectedPage>
        <MailPage />
      </ProtectedPage>
    ),
  },
  {
    path: '/mail/:category/:mailId',
    element: (
      <ProtectedPage>
        <MailPage />
      </ProtectedPage>
    ),
  },

  {
    path: '*',
    element: (
      <ProtectedPage>
        <HomePage />
      </ProtectedPage>
    ),
  },
]);

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster theme='light' richColors position='top-center' />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
