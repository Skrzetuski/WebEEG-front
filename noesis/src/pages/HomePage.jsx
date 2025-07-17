import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        System Neosis
      </h1>
      <p className="text-lg text-gray-600 text-center mb-8 max-w-xl">
        System wspierający analizę sygnałów EEG w czasie rzeczywistym oraz prowadzenie badań z użyciem sztucznej inteligencji.
      </p>
      <button
        onClick={handleLoginRedirect}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Zaloguj się
      </button>
    </div>
  );
};

export default HomePage;
