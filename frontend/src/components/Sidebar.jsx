import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <div className="w-64 bg-gray-800 text-white h-full">
      <div className="p-4">
        <h2 className="text-lg font-semibold">Menu</h2>
        <ul className="mt-4">
          <li className={`p-2 ${location.pathname === '/dashboard' ? 'bg-gray-700' : ''}`}>
            <Link to="/dashboard" className="block">Dashboard</Link>
          </li>
          {user?.role === 'admin' && (
            <li className={`p-2 ${location.pathname === '/projects/new' ? 'bg-gray-700' : ''}`}>
              <Link to="/projects/new" className="block">Create Project</Link>
            </li>
          )}
          <li className={`p-2 ${location.pathname === '/tasks' ? 'bg-gray-700' : ''}`}>
            <Link to="/tasks" className="block">Tasks</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;