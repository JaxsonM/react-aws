import '../styles.css'; // Make sure to import the CSS file
import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { updateFriendship, deleteFriendship } from '../../graphql/mutations';

const PendingRequestsCard = ({ pendingRequests, currentUser, refreshRequests}) => {
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);

  useEffect(() => {
    // Function to categorize requests
    const categorizeRequests = () => {
      const outgoing = pendingRequests.filter(req => req.userId === currentUser.username);
      const incoming = pendingRequests.filter(req => req.friendId === currentUser.username);
      setOutgoingRequests(outgoing);
      setIncomingRequests(incoming);
    };
  
    categorizeRequests();
  }, [pendingRequests, currentUser]); // Re-run when these dependencies change
  

  const client = generateClient();

  const handleAcceptRequest = async (friendshipId) => {
    try {
      await client.graphql({
        query: updateFriendship,
        variables: {
          input: {
            id: friendshipId,
            status: 'accepted'
          }
        }
      });
      // Refresh the list of friend requests
      await refreshRequests();
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const handleDenyRequest = async (friendshipId) => {
    try {
      await client.graphql({
        query: deleteFriendship,
        variables: {
          input: {
            id: friendshipId
          }
        }
      });
      // Refresh the list of friend requests
      await refreshRequests();
    } catch (error) {
      console.error('Error denying friend request:', error);
    }
  };

  console.log("Pending req", pendingRequests)
  return (
    <div className="card-style">
      <h2 className="card-header">Pending Friend Requests</h2>
      <div className="card-content">
        {incomingRequests.length > 0 && (
          <>
            <h3 className="text-md font-semibold text-gray-700">Incoming Requests</h3>
            <div className="mb-4">
              {incomingRequests.map(request => (
                <div key={request.id} className="card-item">
                  <span className="flex-grow">{request.userId}</span>
                  <div>
                    <button className="confirm-button" onClick={() => handleAcceptRequest(request.id)}>Confirm</button>
                    <button className="deny-button" onClick={() => handleDenyRequest(request.id)}>Deny</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
  
        {outgoingRequests.length > 0 && (
          <>
            <h3 className="text-md font-semibold text-gray-700">Outgoing Requests</h3>
            <div className="mb-4">
              {outgoingRequests.map(request => (
                <div key={request.id} className="card-item">
                  <span className="flex-grow">{request.friendId}</span>
                  <div>
                    <button className="deny-button" onClick={() => handleDenyRequest(request.id)}>Cancel</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
  
        {incomingRequests.length === 0 && outgoingRequests.length === 0 && (
          <p className="no-content">No pending requests.</p>
        )}
      </div>
    </div>
  );
  
};

export default PendingRequestsCard;
