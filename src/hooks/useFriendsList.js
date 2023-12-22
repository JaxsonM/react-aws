import { useState, useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { listFriendships } from '../graphql/queries';

const useFriendsList = () => {
  const [friendsList, setFriendsList] = useState([]);
  const client = generateClient();

  useEffect(() => {
    const fetchFriendsList = async () => {
      try {
        const user = await getCurrentUser();
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
        setFriendsList(friends);
      } catch (error) {
        console.error('Error fetching friends list:', error);
      }
    };

    fetchFriendsList();
  }, []);

  return friendsList;
};

export default useFriendsList;
