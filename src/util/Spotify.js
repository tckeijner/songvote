const clientId = '1a1b349f387b4c89a0a051d88c83ecf7';
let token;
let playlistId = '3uWqj2Y0K7csY12zUHJDMh';
let userId = 'thomaskeijner'
const baseApiUrl = 'https://api.spotify.com/v1';

const Spotify = {
  getAccessToken() {
    if (token) {
      return token;
    };
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      token = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => token = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return token;
    } else {
      const baseAccessUrl = 'https://accounts.spotify.com';
      const redirectUri = 'http://localhost:3000';
      const accessUrl = `${baseAccessUrl}/authorize?client_id=${clientId}&scope=playlist-modify-private&response_type=token&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    };
  },

  search(term) {
    return fetch(`${baseApiUrl}/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },

      fetchPlaylist() {
        const getConfig = {
          method: 'GET',
          headers: { Authorization: `Bearer ${accessToken}` }
      };
          return fetch(
            `${baseApiUrl}/playlists/${playlistId}`,
            getConfig
          ).then(response => {
            return response.json();
          })
      },

      addSelectionToPlaylist (uris) {
        const getConfig = {
          method: 'POST',
          headers: { 
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json'
          },
          contentType: 'application/json',
          body: JSON.stringify({
            uris: uris
          }),
          dataType: 'json',
        }
        console.log(getConfig.body);
        return fetch(
          `${baseApiUrl}/playlists/${playlistId}/tracks`,
          getConfig
        ).then(response => {
          console.log(response)
        });
      },

      createEmptyPlaylist(name) {
        const getConfig = {
          method: 'POST',
          headers: { 
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json'
          },
          contentType: 'application/json',
          body: JSON.stringify({
            name: name,
            public: false,
            collaborative: true
          }),
          dataType: 'json',
        };
        return fetch(
          `${baseApiUrl}/users/${userId}/playlists`,
          getConfig
        ).then(response => {
          console.log(response);
        });
      }

};
let accessToken = Spotify.getAccessToken();
export default Spotify;