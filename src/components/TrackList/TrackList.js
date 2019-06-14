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
						onAdd={this.props.onAdd} 
						onRemove={this.props.onRemove} 
						isSearchResults={this.props.isSearchResults}
						isYourSelection={this.props.isYourSelection}
						isHostSearch={this.props.isHostSearch}/>
				})}
			</List>
		);
	};
};

export default TrackList;