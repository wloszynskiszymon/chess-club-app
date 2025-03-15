import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthProvider from './wrappers/AuthProvider';
import OnlyAuthenticated from './wrappers/OnlyAuthenticated';
import { Toaster } from './components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TournamentsPage from './pages/TournamentsPage';
import TournamentDetailsPage from './pages/TournamentDetailsPage';
import OnlyNotAuthenticated from './wrappers/OnlyNotAuthenticated';
import MailPage from './pages/MailPage';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import OnlyValidMailFilters from './wrappers/OnlyValidMailFilters';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <OnlyAuthenticated>
        <HomePage />
      </OnlyAuthenticated>
    ),
  },
  {
    path: '/auth/login',
    element: (
      <OnlyNotAuthenticated>
        <LoginPage />
      </OnlyNotAuthenticated>
    ),
  },
  {
    path: '/auth/register',
    element: (
      <OnlyNotAuthenticated>
        <RegisterPage />
      </OnlyNotAuthenticated>
    ),
  },
  {
    path: '/tournaments',
    element: (
      <OnlyAuthenticated>
        <TournamentsPage />
      </OnlyAuthenticated>
    ),
  },
  {
    path: '/tournament/:tournamentId',
    element: (
      <OnlyAuthenticated>
        <TournamentDetailsPage />
      </OnlyAuthenticated>
    ),
  },
  {
    path: '/mail/:filter',
    element: (
      <OnlyAuthenticated>
        <OnlyValidMailFilters>
          <MailPage />
        </OnlyValidMailFilters>
      </OnlyAuthenticated>
    ),
  },
  {
    path: '/mail/:filter/:mailId',
    element: (
      <OnlyAuthenticated>
        <OnlyValidMailFilters>
          <MailPage />
        </OnlyValidMailFilters>
      </OnlyAuthenticated>
    ),
  },
  {
    path: '*',
    element: (
      <OnlyAuthenticated>
        <HomePage />
      </OnlyAuthenticated>
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
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
