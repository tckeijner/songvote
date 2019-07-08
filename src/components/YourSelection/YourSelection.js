import React from 'react';
import './YourSelection.css';
import TrackList from '../TrackList/TrackList.js';
import { Card, Button, CardContent } from '@material-ui/core'

class YourSelection extends React.Component {
    render() {
        return (
            <Card className='YourSelection'>
                <CardContent>
                    <Button className='add-selection' onClick={this.props.onFinish}>Add To Party Playlist</Button>
                    <TrackList 
                        tracks={this.props.yourSelection} 
                        isYourSelection={true}
                        onRemove={this.props.onRemove}/>                    
                </CardContent>
            </Card>
        );
    }
}

export default YourSelection;