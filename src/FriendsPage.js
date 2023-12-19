import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createFriendship, updateFriendship, deleteFriendship } from './graphql/mutations';
import { getCurrentUser } from 'aws-amplify/auth';
import { listFriendships } from './graphql/queries';
import FriendsCard from './FriendsCard';
import PendingRequestsCard from './PendingRequestsCard';


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
                console.log("user.username", user.username)
                const fetchPendingRequests = async () => {
                    try {
                      const result = await client.graphql({
                        query: listFriendships,
                        variables: { filter: { friendId: { eq: user.username }, status: { eq: 'pending' } } }
                      });
                      setPendingRequests(result.data.listFriendships.items);
                      console.log("pending req res:", result.data.listFriendships)
                    } catch (error) {
                      console.error('Error fetching pending friend requests:', error);
                    }
                  };
                  fetchPendingRequests();

                  const fetchFriendsList = async () => {
                    try {
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
        console.log(friendUsername)
        const lowercasedFriendUsername = friendUsername.toLowerCase();
        console.log(lowercasedFriendUsername)
        console.log("Friend name:", lowercasedFriendUsername);
        console.log("My name:", currentUser.username);
        const friendshipInput = {
          userId: currentUser.username,  // Ensure current user's username is also lowercased
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
      <PendingRequestsCard
    pendingRequests={pendingRequests}
    onAccept={handleAcceptRequest}
    onDeny={handleDenyRequest}
  />
    </div>


      <div>
      <FriendsCard currentUser={currentUser} friendsList={friendsList} />
    </div>
    </div>
  );
};

export default FriendsPage;
