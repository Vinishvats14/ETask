import { useState, useEffect } from 'react';
import client from '../services/client';
import Loader from '../components/Loader';
import TopBar from '../components/TopBar';
import SideNav from '../components/SideNav';
import AssignmentCard from '../components/AssignmentCard';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/UserContext';
import { toast } from 'react-toastify';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { employee } = useAuth();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await client.get('/assignments');
        setAssignments(response.data?.data || []);
      } catch (error) {
        console.error('Failed to fetch assignments', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

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

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <SideNav />
      <div className="flex-1 flex flex-col overflow-auto">
        <TopBar />
        <div className="p-8">
          <div className="mb-6">
            <Link to="/overview" className="text-indigo-600 hover:text-indigo-900 font-medium">
              ← Back to Overview
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">All Assignments</h1>
          {assignments.length === 0 ? (
            <p className="text-gray-500">No assignments found.</p>
          ) : (
            <div className="space-y-4">
              {assignments.map((assignment) => (
                <AssignmentCard 
                  key={assignment._id} 
                  assignment={assignment} 
                  onUpdateStatus={employee?.accessLevel === 'manager' || employee?._id === assignment.assigneeId?._id ? handleUpdateStatus : null}
                  onDelete={employee?.accessLevel === 'manager' ? handleDeleteAssignment : null}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assignments;
