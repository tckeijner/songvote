import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList.js';
import {Card, CardContent, Typography} from '@material-ui/core/';
import styles from '../Styles';

class Playlist extends React.Component {
    render () {
        return (
            <Card style={styles.card} className='SearchBar'>
                <CardContent>
                    <Typography variant="h5" >Public playlist</Typography>
                    <TrackList tracks={this.props.playlist}/>
                </CardContent>
            </Card>
            );
    };
};

export default Playlist;