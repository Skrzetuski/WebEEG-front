import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService } from '../services/auth';
import { useAuth } from '../hooks/useAuth';
import { getCurrentUser } from '../services/auth';

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const token = await loginService(login, password);
      localStorage.setItem('token', token.access_token);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      navigate('/dashboard');
    } catch(err){
      setError('Nieprawidłowy login lub hasło.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold mb-4">Logowanie</h2>

        <label className="block mb-2 text-sm font-bold text-gray-700">
          Login
        </label>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-4"
        />

        <label className="block mb-2 text-sm font-bold text-gray-700">
          Hasło
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-4"
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Zaloguj się
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
