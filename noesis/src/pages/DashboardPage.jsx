import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/auth';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {user ? (
        <>
          <p className="mb-4">Witaj, <span className="font-semibold">{user.login}</span>!</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Wyloguj się
          </button>
        </>
      ) : (
        <p>Ładowanie danych użytkownika...</p>
      )}
    </div>
  );
};

export default DashboardPage;
