import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">EEG Dashboard</h1>
      <div className="flex items-center gap-4">
        {user && (
          <span className="text-gray-700 font-medium">
            Zalogowany jako <span className="font-semibold">{user.login}</span>
          </span>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
        >
          Wyloguj się
        </button>
      </div>
    </header>
  );
};

export default Navbar;
