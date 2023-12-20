import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { listFriendships } from '../graphql/queries';
import FriendsCard from './FriendsCard';
import PendingRequestsCard from './PendingRequestsCard';
import AddFriendCard from './AddFriendCard';


const FriendsPage = () => {
    const [friendsList, setFriendsList] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [pendingRequests, setPendingRequests] = useState([]);

    const client = generateClient();

    // Standalone function to initialize data
    const initializeData = async () => {
        try {
            const user = await getCurrentUser();
            setCurrentUser(user);

            const result = await client.graphql({
                query: listFriendships,
                variables: { 
                    filter: {
                        or: [
                            { userId: { eq: user.username }},
                            { friendId: { eq: user.username }}
                        ]
                    }
                }                          
            });
            const friends = result.data.listFriendships.items.filter(friend => friend.status === 'accepted');
            const pending = result.data.listFriendships.items.filter(friend => friend.status === 'pending');
            setFriendsList(friends);
            setPendingRequests(pending); 
        } catch (error) {
            console.error('Error initializing data:', error);
        }
    };

    // useEffect hook to call initializeData when the component mounts
    useEffect(() => {
        initializeData();
    }, []);

    const refreshFriendRequests = async () => {
      //setPendingRequests(pendingRequests.filter(req => req.id !== friendshipId));
      await initializeData();
    };



  return (
    <div className="flex p-1">

      <div className="p-1">
      <AddFriendCard currentUser={currentUser} refreshRequests={refreshFriendRequests}/>
      </div>

      <div className="p-1">
      <PendingRequestsCard pendingRequests={pendingRequests} currentUser={currentUser} refreshRequests={refreshFriendRequests}/>
    </div>

      <div className="p-1">
      <FriendsCard currentUser={currentUser} friendsList={friendsList} />
    </div>
    
    </div>
  );
};

export default FriendsPage;
