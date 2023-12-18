/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMovie = /* GraphQL */ `
  subscription OnCreateMovie(
    $filter: ModelSubscriptionMovieFilterInput
    $owner: String
  ) {
    onCreateMovie(filter: $filter, owner: $owner) {
      id
      title
      description
      addedBy
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateMovie = /* GraphQL */ `
  subscription OnUpdateMovie(
    $filter: ModelSubscriptionMovieFilterInput
    $owner: String
  ) {
    onUpdateMovie(filter: $filter, owner: $owner) {
      id
      title
      description
      addedBy
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteMovie = /* GraphQL */ `
  subscription OnDeleteMovie(
    $filter: ModelSubscriptionMovieFilterInput
    $owner: String
  ) {
    onDeleteMovie(filter: $filter, owner: $owner) {
      id
      title
      description
      addedBy
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateFriendship = /* GraphQL */ `
  subscription OnCreateFriendship(
    $filter: ModelSubscriptionFriendshipFilterInput
  ) {
    onCreateFriendship(filter: $filter) {
      id
      userId
      friendId
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateFriendship = /* GraphQL */ `
  subscription OnUpdateFriendship(
    $filter: ModelSubscriptionFriendshipFilterInput
  ) {
    onUpdateFriendship(filter: $filter) {
      id
      userId
      friendId
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteFriendship = /* GraphQL */ `
  subscription OnDeleteFriendship(
    $filter: ModelSubscriptionFriendshipFilterInput
  ) {
    onDeleteFriendship(filter: $filter) {
      id
      userId
      friendId
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
