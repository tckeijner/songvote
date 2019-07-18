import React from 'react';
import './App.css';
import Spotify from './util/Spotify';
import CreateNew from './components/CreateNew/CreateNew';
import Home from './components/Home/Home';
import Guest from './components/Guest/Guest';
import db from './firebase';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      yourSelection: [],
      playlist: [],
      client: 'guest',
      partyPin: 123456,
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
    this.setPlaylist = this.setPlaylist.bind(this);
  };

  onStart() {
    this.setState({client: 'host'})
  };

  onJoin() {
    this.setState({client: 'guest'})
  };

  handlePlaylistNameChange(event) {
		this.setState({playlistName: event.target.value})
  };
  
  createNewPlaylist() {
    const name = this.state.playlistName;
    const userId = this.state.userId;
    Spotify.createEmptyPlaylist(name, userId)
    .then((result) => {
      const randomNumber = Math.floor(Math.random()*1000000);
      const pinString = randomNumber.toString();
      this.setState({
        playlistId: result.id,
        userId: result.owner.id,
        hostStep: 2,
        partyPin: pinString
      });
      db.writePlaylistData(this.state.playlistName, this.state.playlistId, this.state.partyPin, this.state.userId);
      console.log(this.state)
    });
  };
  
  finishPlaylist() {
    this.setState({hostStep: 3});
  };

  getPlaylist() {
    Spotify.fetchPlaylist(this.state.playlistId).then(
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
    console.log(this.state)
  };

  componentDidUpdate() {
    console.log(this.state)
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
    console.log(this.state)
    }
  };

  removeTrack(track) {
    let tracks = this.state.yourSelection;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({yourSelection: tracks});
  };

  addSelection() {
    const playlistId = this.state.playlistId
    console.log(playlistId)
    const uriArray = []
    this.state.yourSelection.forEach(track => {
      uriArray.push(track.uri);
    });
    Spotify.addSelectionToPlaylist(uriArray, playlistId)
    .then(() => {
      this.getPlaylist();
    });
  };

  setPlaylist(pin, playlistId) {
    this.setState({
      playlistId: playlistId,
      partyPin: pin
    });
    console.log(this.state)
  }

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
          onFinish={this.finishPlaylist}
          playlistId={this.state.playlistId} />
        )
      case 'guest':
        return (
          <Guest 
          searchResults={this.state.searchResults}
          onSearch={this.search}
          yourSelection={this.state.yourSelection}
          onRemove={this.removeTrack}
          onAddTrack={this.addTrack}
          playlist={this.state.playlist}
          partyPin={this.state.partyPin}
          onFinish={this.addSelection} 
          onSet={this.setPlaylist}
          onAdd={this.addSelection}/>
          )
      default:
        return (
          <div></div>
        )
    }
  };
};
export default App;
