import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList.js';
import {Typography} from '@material-ui/core/';

class Playlist extends React.Component {
    render () {
        return (
            <div>
                    <Typography variant="h5" >Public playlist</Typography>
                    <TrackList tracks={this.props.playlist}/>
            </div>
            );
    };
};

export default Playlist;