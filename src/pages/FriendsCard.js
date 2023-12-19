import React from 'react';

const FriendsCard = ({ currentUser, friendsList }) => {
  return (
    <div className="bg-blue-100 shadow-lg rounded-lg overflow-hidden">
      <h2 className="text-lg font-bold text-gray-700 bg-blue-200 p-4 shadow">My Friends</h2>
      <div className="p-4">
        {friendsList.length > 0 ? (
          friendsList.map(friend => (
            <div key={friend.id} className="py-2 px-4 hover:bg-blue-50 transition-colors duration-300 ease-in-out">
              <h3 className="text-gray-600 font-medium">{friend.userId === currentUser.username ? friend.friendId : friend.userId}</h3>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">You have no friends in your list.</p>
        )}
      </div>
    </div>
  );
};

export default FriendsCard;
