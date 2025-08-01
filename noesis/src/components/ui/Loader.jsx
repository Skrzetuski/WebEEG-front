const Loader = ({ message = 'Ładowanie...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] text-gray-600">
      <div className="w-6 h-6 mb-3 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default Loader;
