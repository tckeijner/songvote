import React from 'react';
import Track from '../Track/Track.js';
import List from '@material-ui/core/List';


class TrackList extends React.Component {
	render() {
		return (
			<List className="TrackList">
				{this.props.tracks.map(track => {
					return <Track   
					track={track} 
					key={track.id} 
					onAddTrack={this.props.onAddTrack} 
					onRemove={this.props.onRemove} 
					isSearchResults={this.props.isSearchResults}
					isYourSelection={this.props.isYourSelection}
					isHostSearch={this.props.isHostSearch}
					playlistId={this.props.playlistId}/>
				})}
			</List>
		);
	};
};

export default TrackList;