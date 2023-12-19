import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createFriendship } from '../graphql/mutations';
import './styles.css'; // Import the shared styles

const AddFriendCard = ({ currentUser, refreshRequests }) => {
  const [friendUsername, setFriendUsername] = useState('');

  // Create a new GraphQL client instance
  const client = generateClient();

  const handleSendFriendRequest = async () => {
    const lowercasedFriendUsername = friendUsername.toLowerCase();
    const friendshipInput = {
      userId: currentUser.username,
      friendId: lowercasedFriendUsername,
      status: 'pending'
    };

    try {
      await client.graphql({ query: createFriendship, variables: { input: friendshipInput }});
      setFriendUsername('');
      await refreshRequests();
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  return (
    <div className="card-style">
      <div className="mb-2 card-content">
      <input
        type="text"
        value={friendUsername}
        autoComplete="off"
        onChange={(e) => setFriendUsername(e.target.value)}
        placeholder="Enter friend's username"
        className="border rounded p-1 text-sm w-full"
        />

      </div>
      <button
        onClick={handleSendFriendRequest}
        className="confirm-button w-full"
      >
        Send Friend Request
      </button>
    </div>
  );
};

export default AddFriendCard;
