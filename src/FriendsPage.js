import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createFriendship } from './graphql/mutations';
import { getCurrentUser } from 'aws-amplify/auth';
import { listFriendships } from './graphql/queries';

const FriendsPage = () => {
  const [friendUsername, setFriendUsername] = useState('');

    // Create a new GraphQL client instance
    const client = generateClient();

  const handleSendFriendRequest = async () => {
    const currentUser = await getCurrentUser();
    console.log("Friend name:", friendUsername)
    console.log("My name:", currentUser.username)
    const friendshipInput = {
      userId: currentUser.username, // Current user's username
      friendId: friendUsername,     // Friend's username
      status: 'pending'            // Initial status of the friendship
    };

    try {
      const result = await client.graphql({ query: createFriendship, variables: { input: friendshipInput }});
      console.log('Friend request sent:', result);
      setFriendUsername('');
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      const currentUser = await getCurrentUser();
      try {
        const result = await client.graphql({
          query: listFriendships,
          variables: { filter: { friendId: { eq: currentUser.username }, status: { eq: 'pending' } } }
        });
        // const result = await client.graphql({
        //     query: listFriendships,
        //     variables: { /* No filter here */ }
        //   });
          
        console.log("current user:",currentUser.username)
        console.log("result", result.data);
        setPendingRequests(result.data.listFriendships.items);
      } catch (error) {
        console.error('Error fetching pending friend requests:', error);
      }
    };

    fetchPendingRequests();
  }, []);

  return (
    <div>
      <h1>Add a Friend</h1>
      <input
        type="text"
        value={friendUsername}
        onChange={(e) => setFriendUsername(e.target.value)}
        placeholder="Enter friend's username"
      />
      <button onClick={handleSendFriendRequest}>Send Friend Request</button>
      <div>
        <h2>Pending Friend Requests</h2>
        {pendingRequests.map(request => (
          <div key={request.id}>{request.userId}</div>
        ))}
      </div>
    </div>
  );
};

export default FriendsPage;
