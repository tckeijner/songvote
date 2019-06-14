import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList.js';
import {Card, CardContent, Typography} from '@material-ui/core/';

class Playlist extends React.Component {
    render () {
        return (
            <Card className='SearchBar'>
                <CardContent>
                    <Typography variant="h4" >Public playlist</Typography>
                    <TrackList tracks={this.props.playlist}/>
                </CardContent>

            </Card>
            );
    };
};

export default Playlist;