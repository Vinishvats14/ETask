import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';
import client from '../services/client';
import Loader from '../components/Loader';
import AssignmentCard from '../components/AssignmentCard';
import TopBar from '../components/TopBar';
import SideNav from '../components/SideNav';
import { toast } from 'react-toastify';

const InitiativeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employee } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [initiative, setInitiative] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAssignee, setNewAssignee] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assigRes, initRes, empRes] = await Promise.all([
          client.get(`/initiatives/${id}/assignments`),
          client.get(`/initiatives/${id}`),
          client.get(`/identity`)
        ]);
        setAssignments(assigRes.data?.data || []);
        setInitiative(initRes.data?.data);
        setEmployees(empRes.data?.data || []);
      } catch (error) {
        console.error('Failed to fetch data', error);
        toast.error('Error fetching details');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleDeleteInitiative = async () => {
    if (!window.confirm('Are you sure you want to delete this initiative?')) return;
    try {
      await client.delete(`/initiatives/${id}`);
      toast.success('Initiative deleted');
      navigate('/overview');
    } catch (error) {
      toast.error('Failed to delete initiative');
    }
  };

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    if (!newTitle || !newAssignee) return toast.error('Fill all fields');
    try {
      const res = await client.post(`/initiatives/${id}/assignments`, {
        assignmentTitle: newTitle,
        assigneeId: newAssignee,
        assignmentStatus: 'Not Started'
      });
      setAssignments([...assignments, res.data.data]);
      setShowForm(false);
      setNewTitle('');
      setNewAssignee('');
      toast.success('Assignment created');
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create assignment');
    }
  };

  const handleUpdateStatus = async (assignmentId, status) => {
    try {
      await client.put(`/assignments/${assignmentId}`, { assignmentStatus: status });
      setAssignments(assignments.map(a => a._id === assignmentId ? { ...a, assignmentStatus: status } : a));
      toast.success(`Status updated to ${status}`);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDeleteAssignment = async (assignmentId) => {
    if (!window.confirm('Delete this assignment?')) return;
    try {
      await client.delete(`/assignments/${assignmentId}`);
      setAssignments(assignments.filter(a => a._id !== assignmentId));
      toast.success('Assignment deleted');
    } catch (error) {
      toast.error('Failed to delete assignment');
    }
  };

  const pendingAssignments = assignments.filter(assignment => assignment.assignmentStatus === 'Not Started');
  const inProgressAssignments = assignments.filter(assignment => assignment.assignmentStatus === 'In Progress');
  const completedAssignments = assignments.filter(assignment => assignment.assignmentStatus === 'Completed');

  if (loading) return <Loader />;

  return (
    <div className="flex h-screen bg-gray-50">
      <SideNav />
      <div className="flex-1 flex flex-col overflow-auto">
        <TopBar />
        <div className="p-8">
          <div className="mb-4">
            <Link to="/overview" className="text-indigo-600 hover:text-indigo-900 font-medium">← Back to Overview</Link>
          </div>
          
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{initiative?.initiativeTitle}</h1>
              <p className="text-gray-600 mt-1">{initiative?.initiativeDescription}</p>
            </div>
            {employee?.accessLevel === 'manager' && (
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowForm(!showForm)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 shadow-sm"
                >
                  {showForm ? 'Cancel' : 'Create Assignment'}
                </button>
                <button 
                  onClick={handleDeleteInitiative}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 shadow-sm"
                >
                  Delete Initiative
                </button>
              </div>
            )}
          </div>

          {showForm && (
            <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">New Assignment</h2>
              <form onSubmit={handleCreateAssignment} className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
                  <select
                    value={newAssignee}
                    onChange={e => setNewAssignee(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">Select an employee</option>
                    {employees.map(emp => (
                      <option key={emp._id} value={emp._id}>{emp.fullName}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 shadow-sm">Save</button>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-lg font-bold text-gray-700 mb-4 pb-2 border-b-2 border-gray-300">Not Started</h2>
              {pendingAssignments.map(assignment => (
                <AssignmentCard 
                  key={assignment._id} 
                  assignment={assignment} 
                  onUpdateStatus={employee?.accessLevel === 'manager' || employee?._id === assignment.assigneeId?._id ? handleUpdateStatus : null}
                  onDelete={employee?.accessLevel === 'manager' ? handleDeleteAssignment : null}
                />
              ))}
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-lg font-bold text-gray-700 mb-4 pb-2 border-b-2 border-gray-300">In Progress</h2>
              {inProgressAssignments.map(assignment => (
                <AssignmentCard 
                  key={assignment._id} 
                  assignment={assignment} 
                  onUpdateStatus={employee?.accessLevel === 'manager' || employee?._id === assignment.assigneeId?._id ? handleUpdateStatus : null}
                  onDelete={employee?.accessLevel === 'manager' ? handleDeleteAssignment : null}
                />
              ))}
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-lg font-bold text-gray-700 mb-4 pb-2 border-b-2 border-gray-300">Completed</h2>
              {completedAssignments.map(assignment => (
                <AssignmentCard 
                  key={assignment._id} 
                  assignment={assignment} 
                  onUpdateStatus={employee?.accessLevel === 'manager' || employee?._id === assignment.assigneeId?._id ? handleUpdateStatus : null}
                  onDelete={employee?.accessLevel === 'manager' ? handleDeleteAssignment : null}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitiativeDetail;