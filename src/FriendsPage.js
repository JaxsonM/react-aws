import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createFriendship, updateFriendship, deleteFriendship } from './graphql/mutations';
import { getCurrentUser } from 'aws-amplify/auth';
import { listFriendships } from './graphql/queries';
import FriendsCard from './FriendsCard';

const FriendsPage = () => {
    const [friendUsername, setFriendUsername] = useState('');
    const [friendsList, setFriendsList] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [pendingRequests, setPendingRequests] = useState([]);

    useEffect(() => {
        const initializeData = async () => {
            try {
                const user = await getCurrentUser();
                setCurrentUser(user);
                console.log("current user:", currentUser)
                console.log(user.username)
                const fetchPendingRequests = async () => {
                    try {
                      const result = await client.graphql({
                        query: listFriendships,
                        variables: { filter: { userId: { eq: user.username }, status: { eq: 'pending' } } }
                      });
                      setPendingRequests(result.data.listFriendships.items);
                    } catch (error) {
                      console.error('Error fetching pending friend requests:', error);
                    }
                  };
                  fetchPendingRequests();

                  const fetchFriendsList = async () => {
                    try {
                        console.log(user.username)
                      const result = await client.graphql({
                        query: listFriendships,
                        variables: { 
                            filter: {
                              status: { eq: 'accepted' },
                              or: [
                                { userId: { eq: user.username }},
                                { friendId: { eq: user.username }}
                              ]
                            }
                          }                          
                      });
        
                      console.log("result", result.data);
                      setFriendsList(result.data.listFriendships.items);
                    } catch (error) {
                      console.error('Error fetching friends list:', error);
                    }
                  };
                fetchFriendsList();

            } catch (error) {
              console.error('Error initializing data:', error);
            }
          };
      
          initializeData();
        }, []);

    // Create a new GraphQL client instance
    const client = generateClient();

    const handleSendFriendRequest = async () => {
        //const currentUser = await getCurrentUser();
        const lowercasedFriendUsername = friendUsername.toLowerCase();
        console.log("Friend name:", lowercasedFriendUsername);
        console.log("My name:", currentUser);
        const friendshipInput = {
          userId: currentUser.toLowerCase(),  // Ensure current user's username is also lowercased
          friendId: lowercasedFriendUsername,         // Use the lowercased friend's username
          status: 'pending'                          // Initial status of the friendship
        };

    try {
      const result = await client.graphql({ query: createFriendship, variables: { input: friendshipInput }});
      console.log('Friend request sent:', result);
      setFriendUsername('');
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };
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
      setPendingRequests(pendingRequests.filter(req => req.id !== friendshipId));
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
      setPendingRequests(pendingRequests.filter(req => req.id !== friendshipId));
    } catch (error) {
      console.error('Error denying friend request:', error);
    }
  };

//   const [pendingRequests, setPendingRequests] = useState([]);



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
      {pendingRequests.length > 0 ? (
        
        pendingRequests.map(request => (
            
          <div key={request.id}>
            {/* Friend request details */}
          </div>
        ))
      ) : (
        <p>No pending friend requests.</p>
      )}
    </div>

      <div>
      <FriendsCard currentUser={currentUser} friendsList={friendsList} />
    </div>
    </div>
  );
};

export default FriendsPage;
