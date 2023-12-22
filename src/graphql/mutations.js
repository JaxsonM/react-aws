/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMovie = /* GraphQL */ `
  mutation CreateMovie(
    $input: CreateMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    createMovie(input: $input, condition: $condition) {
      id
      title
      description
      groupId
      addedBy
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateMovie = /* GraphQL */ `
  mutation UpdateMovie(
    $input: UpdateMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    updateMovie(input: $input, condition: $condition) {
      id
      title
      description
      groupId
      addedBy
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteMovie = /* GraphQL */ `
  mutation DeleteMovie(
    $input: DeleteMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    deleteMovie(input: $input, condition: $condition) {
      id
      title
      description
      groupId
      addedBy
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createMovieGroup = /* GraphQL */ `
  mutation CreateMovieGroup(
    $input: CreateMovieGroupInput!
    $condition: ModelMovieGroupConditionInput
  ) {
    createMovieGroup(input: $input, condition: $condition) {
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
export const updateMovieGroup = /* GraphQL */ `
  mutation UpdateMovieGroup(
    $input: UpdateMovieGroupInput!
    $condition: ModelMovieGroupConditionInput
  ) {
    updateMovieGroup(input: $input, condition: $condition) {
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
export const deleteMovieGroup = /* GraphQL */ `
  mutation DeleteMovieGroup(
    $input: DeleteMovieGroupInput!
    $condition: ModelMovieGroupConditionInput
  ) {
    deleteMovieGroup(input: $input, condition: $condition) {
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
export const createFriendship = /* GraphQL */ `
  mutation CreateFriendship(
    $input: CreateFriendshipInput!
    $condition: ModelFriendshipConditionInput
  ) {
    createFriendship(input: $input, condition: $condition) {
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
export const updateFriendship = /* GraphQL */ `
  mutation UpdateFriendship(
    $input: UpdateFriendshipInput!
    $condition: ModelFriendshipConditionInput
  ) {
    updateFriendship(input: $input, condition: $condition) {
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
export const deleteFriendship = /* GraphQL */ `
  mutation DeleteFriendship(
    $input: DeleteFriendshipInput!
    $condition: ModelFriendshipConditionInput
  ) {
    deleteFriendship(input: $input, condition: $condition) {
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
