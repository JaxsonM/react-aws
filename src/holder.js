    const refreshToken = async () => {
      try {
        console.log("Entering refresh token");
        const currentUser = await getCurrentUser();
        console.log("Current User: ", currentUser);
        const response = await axios.post('https://9kaizjbmk9.execute-api.us-east-1.amazonaws.com/dev/spotifytokenhandler-dev', {
          operation: 'refresh_token',
          username: currentUser.username
        });
        const { accessToken } = response.data;

        // Update Cognito custom attribute
        await updateUserAttributes(currentUser, {
          'custom:spotifyAuthToken': accessToken
        });

        return accessToken;
      } catch (error) {
        console.error('Error refreshing token:', error);
        //await sleep(3000);
      }
    };
    async function handleFetchUserAttributes() {
      try {
        const userAttributes = await fetchUserAttributes();
        console.log("user atts from the music stats page: ", userAttributes);
        console.log("Token: ", userAttributes['custom:spotifyAuthToken']);

      } catch (error) {
        console.log(error);
      }
    }
    const fetchAndSetToken = async () => {
      try {
        const userAttributes = await fetchUserAttributes();
        const authToken = userAttributes['custom:spotifyAuthToken'];
        if (authToken) {
          // If the user is logged in and has a stored auth token
          const token = authToken;
          if (token) {
            fetchTopArtists(token, timeRange);
          } else {
            // No token stored, redirect to Spotify Auth URL
            window.location.href = SPOTIFY_AUTH_URL;
          }
        } else {
          // currentUser or attributes are undefined, handle accordingly
          console.log('The current user or custom attributes are not defined.');
          // Possibly redirect to login or show a message to the user
          window.location.href = SPOTIFY_AUTH_URL;
        }
      } catch (error) {
        console.error('Error fetching user attributes:', error);
      }
    };
    

    fetchAndSetToken();