/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMovie = /* GraphQL */ `
  subscription OnCreateMovie($filter: ModelSubscriptionMovieFilterInput) {
    onCreateMovie(filter: $filter) {
      id
      title
      year
      type
      poster
      imdbID
      groupId
      addedBy
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateMovie = /* GraphQL */ `
  subscription OnUpdateMovie($filter: ModelSubscriptionMovieFilterInput) {
    onUpdateMovie(filter: $filter) {
      id
      title
      year
      type
      poster
      imdbID
      groupId
      addedBy
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteMovie = /* GraphQL */ `
  subscription OnDeleteMovie($filter: ModelSubscriptionMovieFilterInput) {
    onDeleteMovie(filter: $filter) {
      id
      title
      year
      type
      poster
      imdbID
      groupId
      addedBy
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateMovieGroup = /* GraphQL */ `
  subscription OnCreateMovieGroup(
    $filter: ModelSubscriptionMovieGroupFilterInput
  ) {
    onCreateMovieGroup(filter: $filter) {
      id
      members
      movies {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateMovieGroup = /* GraphQL */ `
  subscription OnUpdateMovieGroup(
    $filter: ModelSubscriptionMovieGroupFilterInput
  ) {
    onUpdateMovieGroup(filter: $filter) {
      id
      members
      movies {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteMovieGroup = /* GraphQL */ `
  subscription OnDeleteMovieGroup(
    $filter: ModelSubscriptionMovieGroupFilterInput
  ) {
    onDeleteMovieGroup(filter: $filter) {
      id
      members
      movies {
        nextToken
        __typename
      }
      createdAt
      updatedAt
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
