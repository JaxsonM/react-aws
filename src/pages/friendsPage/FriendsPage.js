import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listFriendships } from '../../graphql/queries';
import FriendsCard from '../../components/FriendsCard';
import PendingRequestsCard from './PendingRequestsCard';
import AddFriendCard from './AddFriendCard';
import useCurrentUser from '../../hooks/useCurrentUser';

const FriendsPage = () => {
    const [friendsList, setFriendsList] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const currentUser = useCurrentUser(); // Use the custom hook to get the current user
    const client = generateClient();

    // Standalone function to initialize data
    const initializeData = async () => {
        try {
            // Use currentUser from the hook
            if (currentUser) {
                const result = await client.graphql({
                    query: listFriendships,
                    variables: { 
                        filter: {
                            or: [
                                { userId: { eq: currentUser.username }},
                                { friendId: { eq: currentUser.username }}
                            ]
                        }
                    }                          
                });
                const friends = result.data.listFriendships.items.filter(friend => friend.status === 'accepted');
                const pending = result.data.listFriendships.items.filter(friend => friend.status === 'pending');
                setFriendsList(friends);
                setPendingRequests(pending);
            }
        } catch (error) {
            console.error('Error initializing data:', error);
        }
    };

    // useEffect hook to call initializeData when the component mounts
    useEffect(() => {
        if (currentUser) {
            initializeData();
        }
    }, [currentUser]); // Add currentUser as a dependency

    const refreshFriendRequests = async () => {
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
