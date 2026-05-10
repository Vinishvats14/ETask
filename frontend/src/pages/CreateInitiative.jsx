import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import client from '../services/client';
import { toast } from 'react-toastify';
import TopBar from '../components/TopBar';
import SideNav from '../components/SideNav';

const CreateInitiative = () => {
  const [initiativeTitle, setInitiativeTitle] = useState('');
  const [initiativeDescription, setInitiativeDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await client.post('/initiatives', { initiativeTitle, initiativeDescription });
      toast.success('Initiative created successfully');
      navigate('/overview');
    } catch (error) {
      console.error('Create initiative failed', error);
      toast.error(error.response?.data?.message || 'Failed to create initiative');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <SideNav />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <div className="p-8 max-w-3xl w-full mx-auto">
          <div className="mb-6">
            <Link to="/overview" className="text-indigo-600 hover:text-indigo-900">
              ← Back to Overview
            </Link>
          </div>
          <div className="bg-white shadow rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Create Initiative</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="initiativeTitle" className="block text-sm font-medium text-gray-700">
                  Initiative Title
                </label>
                <input
                  id="initiativeTitle"
                  type="text"
                  value={initiativeTitle}
                  onChange={(e) => setInitiativeTitle(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="initiativeDescription" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="initiativeDescription"
                  value={initiativeDescription}
                  onChange={(e) => setInitiativeDescription(e.target.value)}
                  required
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/overview')}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Initiative'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInitiative;
