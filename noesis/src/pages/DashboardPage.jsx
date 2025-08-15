import { useNavigate } from 'react-router-dom';

const rawModules = import.meta.glob('../pages/dashboard/*.jsx', { eager: true });


const moduleList = Object.entries(rawModules).map(([path, mod]) => {
  const fileName = path.split('/').pop().replace('.jsx', '');

  return {
    title: mod.title || fileName,
    description: mod.description || 'Brak opisu modułu.',
    path: `/dashboard/${fileName.replace('Page', '').toLowerCase()}`,
    // icon: mod.icon || PlayCircle, // domyślna ikona
  };
});

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Moduły aplikacji</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {moduleList.map(({ title, description, path}) => (
          <div
            key={title}
            onClick={() => navigate(path)}
            className="cursor-pointer bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow flex items-start gap-4"
          >
            {/* <Icon className="w-8 h-8 text-blue-600 mt-1" /> */}
            <div>
              <h3 className="text-xl font-semibold mb-1">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
