import React from 'react';
import { Grid, TextField, Button, Typography, Card, CardContent} from '@material-ui/core';
import NavBar from '../NavBar';
import Search from '../Search/Search';
import YourSelection from '../YourSelection/YourSelection';
import Playlist from '../Playlist/Playlist';
import db from '../../firebase';
import styles from '../Styles';

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
                        <NavBar/>
                        <Grid
                        container 
                        spacing={3}
                        style={styles.grid}
                        direction="row"
                        justify="center"
                        alignItems="flex-start">
                            <Card style={styles.card}>
                                <CardContent>
                                    <Typography>
                                        Enter the party PIN that you acquired from your party host.
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <TextField
                                    id="pin-entry"
                                    label="Enter party PIN"
                                    onChange={this.handlePinEntryChange} />
                                </CardContent>
                                <CardContent>
                                    <Button 
                                    style={styles.button}
                                    variant="contained"
                                    onClick={this.matchPartyPin}>
                                        Join Party
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>

                    </div>
                )
            case 2:
                return (
                    <div>
                        <NavBar />
                        <Grid container 
                        spacing={3} 
                        style={styles.grid}
                        justify="flex-start"
                        alignItems="flex-start"
                        direction='row'>
                            <Grid item xs={12}>
                                <Search
                                className='Search' 
                                searchResults={this.props.searchResults} 
                                onAddTrack={this.props.onAddTrack} 
                                isSearchResults={true}
                                onSearch={this.props.onSearch}/>
                            </Grid>
                            <Grid item xs={12}>
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
                            spacing={3} 
                            style={styles.grid}
                            justify="center"
                            alignItems="center">
                                <Card style={styles.card}>
                                    <CardContent>
                                        <Typography variant="h5">
                                            Happy party!
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </div>
                    )
        }

    }
};

export default Guest;