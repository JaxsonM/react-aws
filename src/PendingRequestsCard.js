import React from 'react';

const PendingRequestsCard = ({ pendingRequests, onAccept, onDeny }) => {
//   if (pendingRequests.length === 0) {
//     return <p>No pending friend requests.</p>;
//   }

return (
    <div className="border-2 rounded h-80 w-48">
      <h2 className="border-b-2">Pending Friend Requests</h2>
      {pendingRequests.map(request => (
        <div key={request.id} className="flex items-center justify-between p-2 border">
          <span>{request.userId}</span> {/* Assuming friendId is the one who sent the request */}
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-1 px-2 rounded mr-2" onClick={() => onAccept(request.id)}>Confirm</button>
            <button className="bg-red-500 hover:bg-red-700 text-white text-xs font-bold py-1 px-2 rounded" onClick={() => onDeny(request.id)}>Deny</button>
          </div>
        </div>
      ))}
    </div>
  );  
};

export default PendingRequestsCard;
