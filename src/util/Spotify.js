const clientId = '1a1b349f387b4c89a0a051d88c83ecf7';
let token;
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

  fetchPlaylist(playlistId) {
    const getConfig = {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` }
  };
      return fetch(
        `${baseApiUrl}/playlists/${playlistId}`,
        getConfig
      ).then(response => {
        return response.json();
      });
  },

  addSelectionToPlaylist (uris, playlistId) {
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
    };
    return fetch(
      `${baseApiUrl}/playlists/${playlistId}/tracks`,
      getConfig
    ).then(response => {
      console.log(response)
    });
  },

  createEmptyPlaylist(name, userId) {
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
      `${baseApiUrl}/me/playlists`,
      getConfig
    ).then(response => {
      return response.json();
    });
  }

};
let accessToken = Spotify.getAccessToken();
export default Spotify;