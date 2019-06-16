import React from 'react';
import './App.css';
import Spotify from './util/Spotify';
import CreateNew from './components/CreateNew/CreateNew';
import Home from './components/Home/Home';
import Guest from './components/Guest/Guest';
import * as firebase from 'firebase';
import playlistsRef from './firebase';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      yourSelection: [],
      playlist: [],
      client: 'home',
      partyPin: '',
      playlistName: '',
      playlistId: '',
      hostStep: 1,
      hostTerm: '',
      userId: ''
    };
    
    this.onStart = this.onStart.bind(this);
    this.onJoin = this.onJoin.bind(this);
    this.createNewPlaylist = this.createNewPlaylist.bind(this);
    this.handlePlaylistNameChange = this.handlePlaylistNameChange.bind(this);
    this.finishPlaylist = this.finishPlaylist.bind(this)
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.search = this.search.bind(this);
    this.addSelection = this.addSelection.bind(this);
  };

  onStart() {
    this.setState({client: 'host'})
  };

  onJoin() {
    this.setState({client: 'guest'})
  }

  handlePlaylistNameChange(event) {
		this.setState({playlistName: event.target.value})
  };
  
  createNewPlaylist() {
    const name = this.state.playlistName;
    const userId = this.state.userId;
    Spotify.createEmptyPlaylist(name, userId)
    .then((result) => {
      console.log(result)
      const randomNumber = Math.floor(Math.random()*1000000);
      const pinString = randomNumber.toString();
      this.setState({
        playlistId: result.id,
        userId: result.owner.id,
        hostStep: 2,
        partyPin: pinString
      });
      console.log(this.state);
      const db = firebase.firestore();
      db.settings({
        timestampsInSnapshots: true
      });
      const playlistsRef = db.collection("playlists").add({
        partyPin: this.state.partyPin,
        playlistId: this.state.playlistId,
        userId: this.state.userId
      });  
    })
  };
  
  finishPlaylist() {
    this.setState({hostStep: 3});
  };

  getPlaylist(Id) {
    Spotify.fetchPlaylist(Id).then(
      (result) => {
        const trackArray = []
        result.tracks.items.forEach(item => {
          let track = {
            name: item.track.name,
            artist: item.track.artists[0].name,
            album: item.track.album.name,
            id: item.track.id,
            uri: item.uri
          };
          trackArray.push(track)
          this.setState({playlist: trackArray});
        });
      }
    );
  };

  componentWillMount() {
    if (this.state.playlistId === '') {
      return;
    } else {
      this.getPlaylist(this.state.playlistId);
    }
  };

  componentDidMount() {

  };

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  };

  addTrack(track) {
    let tracks = this.state.yourSelection;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      alert("Track already in selection!");
    } else if (this.state.yourSelection.length >= 3){
      alert("You have reached the maximum number of songs!")
    } else {
    tracks.push(track);
    this.setState({yourSelection: tracks});
    }
  };

  removeTrack(track) {
    let tracks = this.state.yourSelection;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({yourSelection: tracks});
  };

  addSelection() {
    const playlistId = this.state.playlistId
    const uriArray = []
    this.state.yourSelection.forEach(track => {
      uriArray.push(track.uri);
    });
    Spotify.addSelectionToPlaylist(uriArray, playlistId)
    .then(() => {
      this.getPlaylist();
    });
  };

  render() {
    switch(this.state.client) {
      case 'home':
        return (
          <Home 
          onStart={this.onStart}
          onJoin={this.onJoin}/>
        )
      case 'host':
        return (
          <CreateNew 
          partyPin={this.state.partyPin}
          onCreate={this.createNewPlaylist}
          onPlaylistNameChange={this.handlePlaylistNameChange}
          onSearch={this.search}
          hostStep={this.state.hostStep}
          searchResults={this.state.searchResults}
          isHostSearch={true}
          onFinish={this.finishPlaylist} />
        )
      case 'guest':
        return (
          <Guest 
          searchResults={this.state.searchResults}
          onSearch={this.search}
          yourSelection={this.state.yourSelection}
          onRemove={this.removeTrack}
          onAddTrack={this.addSelection}
          playlist={this.state.playlist}
          partyPin={this.state.partyPin}/>
          )
      default:
        return (
          <div></div>
        )
    }
  };
};
export default App;
