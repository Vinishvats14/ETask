import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/UserContext';

const SideNav = () => {
  const location = useLocation();
  const { employee } = useAuth();

  return (
    <div className="w-64 bg-gray-800 text-white h-full">
      <div className="p-4">
        <h2 className="text-lg font-semibold">Menu</h2>
        <ul className="mt-4">
          <li className={`p-2 ${location.pathname === '/overview' ? 'bg-gray-700' : ''}`}>
            <Link to="/overview" className="block">Overview</Link>
          </li>
          {employee?.accessLevel === 'manager' && (
            <li className={`p-2 ${location.pathname === '/initiatives/new' ? 'bg-gray-700' : ''}`}>
              <Link to="/initiatives/new" className="block">Create Initiative</Link>
            </li>
          )}
          <li className={`p-2 ${location.pathname === '/assignments' ? 'bg-gray-700' : ''}`}>
            <Link to="/assignments" className="block">Assignments</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNav;