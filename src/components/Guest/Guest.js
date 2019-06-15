import React from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import NavBar from '../NavBar';
import Search from '../Search/Search';
import YourSelection from '../YourSelection/YourSelection';
import Playlist from '../Playlist/Playlist';

class Guest extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            guestStep: 1,
            pinEntry: ''
        };
        this.handlePinEntryChange = this.handlePinEntryChange.bind(this);

    };

    handlePinEntryChange(event) {
        this.setState({pinEntry: event.target.value})
    };

    render() {
        switch (this.state.guestStep) {
            default:
                return (
                    <div></div>
                )
            case 1:
                return (
                    <div>
                        <TextField
                        id="pin-entry"
                        label="Enter party PIN"
                        onChange={this.handlePinEntryChange} />
                        <Button>
                            Join Party
                        </Button>
                    </div>
                )
            case 2:
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
                    isYourSelection={true}/>
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

    }
};

export default Guest;