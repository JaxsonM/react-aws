/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMovie = /* GraphQL */ `
  query GetMovie($id: ID!) {
    getMovie(id: $id) {
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
export const listMovies = /* GraphQL */ `
  query ListMovies(
    $filter: ModelMovieFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMovies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getMovieGroup = /* GraphQL */ `
  query GetMovieGroup($id: ID!) {
    getMovieGroup(id: $id) {
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
export const listMovieGroups = /* GraphQL */ `
  query ListMovieGroups(
    $filter: ModelMovieGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMovieGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        members
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getFriendship = /* GraphQL */ `
  query GetFriendship($id: ID!) {
    getFriendship(id: $id) {
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
export const listFriendships = /* GraphQL */ `
  query ListFriendships(
    $filter: ModelFriendshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFriendships(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        friendId
        status
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const moviesByGroupIdAndTitle = /* GraphQL */ `
  query MoviesByGroupIdAndTitle(
    $groupId: ID!
    $title: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMovieFilterInput
    $limit: Int
    $nextToken: String
  ) {
    moviesByGroupIdAndTitle(
      groupId: $groupId
      title: $title
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
