import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import client from '../services/client';
import Loader from '../components/Loader';
import TopBar from '../components/TopBar';
import SideNav from '../components/SideNav';
import { useAuth } from '../context/UserContext';

const Overview = () => {
  const [initiatives, setInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const response = await client.get('/initiatives');
        setInitiatives(response.data?.data || []);
      } catch (error) {
        console.error('Failed to fetch initiatives', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInitiatives();
  }, []);

  const { employee } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex h-screen">
      <SideNav />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
            {employee?.accessLevel === 'manager' && (
              <Link
                to="/initiatives/new"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Create Initiative
              </Link>
            )}
          </div>
          {initiatives.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-500 text-lg">No initiatives found. Create one!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {initiatives.map((initiative) => (
                <div key={initiative._id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900">{initiative.initiativeTitle}</h3>
                    <p className="mt-2 text-sm text-gray-500">{initiative.initiativeDescription}</p>
                    <div className="mt-4">
                      <Link
                        to={`/initiative/${initiative._id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;