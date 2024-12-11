import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthProvider from './providers/AuthProvider';
import ProtectedPage from './providers/ProtectedPage';
import { checkIsNotAuthenticated } from './pages/loaders/authLoader';
import { Toaster } from './components/ui/sonner';

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
      <Toaster />
    </AuthProvider>
  );
}

export default App;
