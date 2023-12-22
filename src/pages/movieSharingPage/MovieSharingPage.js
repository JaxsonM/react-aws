import React, { useState, useEffect } from 'react';
import FriendsCard from '../../components/FriendsCard';
import useFriendsList from '../../hooks/useFriendsList';
import useCurrentUser from '../../hooks/useCurrentUser';
import { createMovieGroup } from '../../graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import { listMovieGroups } from '../../graphql/queries';

const MovieSharingPage = () => {
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const friendsList = useFriendsList();
  const currentUser = useCurrentUser();

  const client = generateClient();
  const [movieGroups, setMovieGroups] = useState([]);

  useEffect(() => {
    const fetchMovieGroups = async () => {
      if (currentUser) {
        try {
          const filter = {
            members: {
              contains: currentUser.username
            }
          };
          const result = await client.graphql({
            query: listMovieGroups,
            variables: { filter: filter }
          });
          setMovieGroups(result.data.listMovieGroups.items);
        } catch (error) {
          console.error("Error fetching movie groups:", error);
        }
      }
    };

    fetchMovieGroups();
  }, [currentUser]);

  
  useEffect(() => {
    if (currentUser && !selectedFriends.includes(currentUser.username)) {
      setSelectedFriends([...selectedFriends, currentUser.username]);
    }
  }, [currentUser, selectedFriends]);

  const handleSelectFriend = (username) => {
    setSelectedFriends(prevSelected => {
      if (prevSelected.includes(username)) {
        return prevSelected.filter(user => user !== username);
      } else {
        return [...prevSelected, username];
      }
    });
  };

  const handleCreateGroup = async () => {
    try {
      const groupInput = {
        members: selectedFriends, // Assuming this matches the expected structure
        // Add other necessary fields for MovieGroup here
      };
      console.log("memembers: ", selectedFriends)
      const newGroup = await client.graphql({
        query: createMovieGroup,
        variables: { input: groupInput }
      });
      console.log("New MovieGroup created: ", newGroup);
      // Additional UI feedback or actions
    } catch (error) {
      console.error("Error creating MovieGroup:", error);
      // Error handling
    }
    setShowCreateGroupModal(false);
  };
  

  return (
    <div>
      <button className="border bg-slate-300" onClick={() => setShowCreateGroupModal(true)}>Create Shared Movie List</button>

      {showCreateGroupModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Select Friends</h2>
            <div className="p-1">
              <FriendsCard currentUser={currentUser} friendsList={friendsList} selectable={true} onFriendSelect={handleSelectFriend} />
            </div>
            <button onClick={handleCreateGroup}>Confirm</button>
            <button onClick={() => setShowCreateGroupModal(false)}>Cancel</button>
          </div>
        </div>
      )}
      <div>
      <h2>Your Movie Groups</h2>
      {movieGroups.length > 0 ? (
        <ul>
          {movieGroups.map(group => (
            <li key={group.id}>
              <p>Group ID: {group.id}</p>
              <p>Members: {group.members.join(', ')}</p>
              {/* Display other group details here */}
            </li>
          ))}
        </ul>
      ) : (
        <p>You are not part of any movie groups yet.</p>
      )}
    </div>
    </div>
  );
};

export default MovieSharingPage;
