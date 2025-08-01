import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/ui/Loader';

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loader message="Weryfikuję sesję użytkownika..." />;
  if (!user) return <Navigate to="/login" />;

  return <Outlet />;

};

export default PrivateRoute;
