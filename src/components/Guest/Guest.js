import React from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import NavBar from '../NavBar';
import Search from '../Search/Search';
import YourSelection from '../YourSelection/YourSelection';
import Playlist from '../Playlist/Playlist';
import db from '../../firebase';

class Guest extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            guestStep: 1,
            pinEntry: '',
            playlistIdRef: ''
        };
        this.handlePinEntryChange = this.handlePinEntryChange.bind(this);
        this.matchPartyPin = this.matchPartyPin.bind(this);
        this.addSelection = this.addSelection.bind(this);

    };

    componentDidUpdate() {
        console.log(this.state)
    };

    handlePinEntryChange(event) {
        this.setState({pinEntry: event.target.value})
    };

    matchPartyPin() {
        db.matchPartyPin(this.state.pinEntry)
        .then(result => {
            this.setState({playlistIdRef: result});
            this.setState({guestStep: 2});
            this.props.onSet(this.state.pinEntry, result)
        })
    };

    addSelection() {
        this.props.onAdd();
        this.setState({guestStep: 3});
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
                        <Button 
                        onClick={this.matchPartyPin}>
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
                    onAdd={this.addSelection}
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
            case 3: 
                    return (
                        <div>
                            <NavBar />
                            <Grid container 
                            spacing={24} 
                            style={{padding: 24}}
                            justify="space-evenly"
                            alignItems="flex-start">
                                <h1>
                                    Happy Party!
                                </h1>
                            </Grid>
                        </div>
                    )
        }

    }
};

export default Guest;