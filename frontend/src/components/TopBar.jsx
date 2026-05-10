import { useAuth } from '../context/UserContext';

const TopBar = () => {
  const { employee, logout } = useAuth();

  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">ETask</div>
        <div className="flex items-center space-x-4">
          <span>Welcome, {employee?.fullName || 'Employee'}</span>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;