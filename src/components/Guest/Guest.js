import React from 'react';
import { Grid } from '@material-ui/core';
import NavBar from '../NavBar';
import Search from '../Search/Search';
import YourSelection from '../YourSelection/YourSelection';
import Playlist from '../Playlist/Playlist';

class Guest extends React.Component {
    render() {
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
                  searchResults={this.props.searchResults} 
                  onAddTrack={this.props.onAddTrack} 
                  isSearchResults={true}
                  onSearch={this.props.onSearch}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <YourSelection 
                  className='YourSelection' 
                  yourSelection={this.props.yourSelection} 
                  onRemove={this.props.onRemove} 
                  onAdd={this.props.onAdd} 
                  isYourSelection={true}
                  />
              </Grid>
              <Grid item xs={12}>
                <Playlist 
                  className='Playlist' 
                  playlist={this.props.playlist} 
                  isPlaylist={true}/>
              </Grid>
            </Grid>
          </div>
        )
    }
};

export default Guest;