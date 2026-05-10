const AssignmentCard = ({ assignment, onUpdateStatus, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{assignment.assignmentTitle}</h3>
          {assignment.assigneeId?.fullName && (
            <p className="text-sm text-gray-500 mt-1">Assigned to: {assignment.assigneeId.fullName}</p>
          )}
          <p className="text-xs text-gray-400 mt-2">Status: {assignment.assignmentStatus}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          {onUpdateStatus && assignment.assignmentStatus !== 'Completed' && (
            <button 
              onClick={() => onUpdateStatus(assignment._id, assignment.assignmentStatus === 'Not Started' ? 'In Progress' : 'Completed')}
              className="text-indigo-600 hover:text-indigo-800"
            >
              Move to {assignment.assignmentStatus === 'Not Started' ? 'In Progress' : 'Completed'}
            </button>
          )}
          {onDelete && (
            <button 
              onClick={() => onDelete(assignment._id)}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;