import React from 'react';

const FriendsCard = ({ currentUser, friendsList }) => {
  return (
    <div className="border-2 rounded h-80 w-48">
      <h2 className="border-b-2">My Friends</h2>
      {friendsList.length > 0 ? (
        friendsList.map(friend => (
          <div key={friend.id}>
            <h3>{friend.userId === currentUser.username ? friend.friendId : friend.userId}</h3>
          </div>
        ))
      ) : (
        <p>You have no friends in your list.</p>
      )}
    </div>
  );
};

export default FriendsCard;
