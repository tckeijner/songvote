import React from 'react';
import './YourSelection.css';
import TrackList from '../TrackList/TrackList.js';
import { Card, Button, CardContent, Typography, CardActionArea } from '@material-ui/core';
import styles from '../Styles';

class YourSelection extends React.Component {
    render() {
        return (
            <Card style={styles.card}>
                <CardContent>
                    <Typography variant="h5">
                        Your selection: 
                    </Typography>
                    <Typography>
                        (You can select a maximum of 3 songs to add to the playlist.) 
                    </Typography>
                </CardContent>
                <CardContent>
                    <TrackList 
                    tracks={this.props.yourSelection} 
                    isYourSelection={true}
                    onRemove={this.props.onRemove}/>                    
                </CardContent>
                <CardActionArea>
                    <Button style={styles.button} variant="contained" className='add-selection' onClick={this.props.onAdd}>Add To Party Playlist</Button>
                </CardActionArea>
            </Card>
        );
    }
}

export default YourSelection;