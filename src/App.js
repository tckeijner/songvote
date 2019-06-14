import React from 'react';
import './App.css';
import Search from './components/Search/Search.js';
import Playlist from './components/Playlist/Playlist.js';
import YourSelection from './components/YourSelection/YourSelection.js';
import Spotify from './util/Spotify';
import Grid from '@material-ui/core/Grid';
import NavBar from './components/NavBar.js';
import CreateNew from './components/CreateNew/CreateNew';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      yourSelection: [],
      playlist: [],
      client: 'host',
      partyPin: 1,
      playlistName: '',
      step: 1,
      hostTerm: ''
    };
    
    this.createNewPlaylist = this.createNewPlaylist.bind(this);
    this.handlePlaylistNameChange = this.handlePlaylistNameChange.bind(this);
    this.finishPlaylist = this.finishPlaylist.bind(this)
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.search = this.search.bind(this);
    this.addSelection = this.addSelection.bind(this);
  };

  handlePlaylistNameChange(event) {
		this.setState({playlistName: event.target.value})
  };
  
  createNewPlaylist() {
    const name = this.state.playlistName;
    Spotify.createEmptyPlaylist(name)
    .then(() => {
      this.setState({step: 2});
      const randomNumber = Math.floor(Math.random()*1000000);
      this.setState({partyPin: randomNumber});
      console.log(this.state);
    });
  };
  
  finishPlaylist() {
    this.setState({step: 3});
  }

  getPlaylist() {
    Spotify.fetchPlaylist().then(
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
    this.getPlaylist();
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
    const uriArray = []
    this.state.yourSelection.forEach(track => {
      uriArray.push(track.uri);
    });
    Spotify.addSelectionToPlaylist(uriArray)
    .then(() => {
      this.getPlaylist();
    });
  };

  render() {
    switch(this.state.client)  {
      case 'host':
        return (
          <CreateNew 
            partyPin={this.state.partyPin}
            onCreate={this.createNewPlaylist}
            onPlaylistNameChange={this.handlePlaylistNameChange}
            onSearch={this.search}
            step={this.state.step}
            searchResults={this.state.searchResults}
            isHostSearch={true}
            onFinish={this.finishPlaylist} />
        );
      case 'guest':
        return (
          <div>
            <NavBar />
            <Grid container 
                spacing={24} 
                style={{padding: 24}}
                justify="space-evenly"
                alignItems="flex-start">
              <Grid item xs={12} sm={6}>
                <Search
                  className='Search' 
                  searchResults={this.state.searchResults} 
                  onAdd={this.addTrack} 
                  isSearchResults={true}
                  onSearch={this.search}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <YourSelection 
                  className='YourSelection' 
                  yourSelection={this.state.yourSelection} 
                  onRemove={this.removeTrack} 
                  onAdd={this.addSelection} 
                  isYourSelection={true}
                  />
              </Grid>
              <Grid item xs={12}>
                <Playlist 
                  className='Playlist' 
                  playlist={this.state.playlist} 
                  isPlaylist={true}/>
              </Grid>
            </Grid>
          </div>
          )
      default: 
      return (
        <div></div>
      );
    }
  };
};
export default App;
