import React from 'react';
import './Track.css';
import ListItem from '@material-ui/core/ListItem'
import { ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import Spotify from '../../util/Spotify'

class Track extends React.Component {
	constructor(props) {
		super(props);
		this.renderAction = this.renderAction.bind(this);
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.addTrackToPlaylist = this.addTrackToPlaylist.bind(this);
	};
	
	renderAction() {
		if (this.props.isHostSearch === true) {
			return <button className="Track-action" onClick={this.addTrackToPlaylist}>Add</button>
		} else if (this.props.isSearchResults === true) {
			return <button className="Track-action" onClick={this.addTrack}>Add</button>
		} else if (this.props.isYourSelection === true) {
			return <button className="Track-action" onClick={this.removeTrack}>Remove</button>
		}
	};

	addTrack() {
		this.props.onAddTrack(this.props.track)
	};

	removeTrack() {
		this.props.onRemove(this.props.track)
	};

	addTrackToPlaylist() {
		const uriArray = []
		uriArray.push(this.props.track.uri)
		Spotify.addSelectionToPlaylist(uriArray, this.props.playlistId)
	};

	render() {
		return (
		<ListItem className="Track">
			<ListItemAvatar>
			<Avatar />
			</ListItemAvatar>
			<ListItemText 
			primary={this.props.track.name}
			secondary={`${this.props.track.album} | ${this.props.track.artist}`}/>
			{this.renderAction()}
		</ListItem>
		);
	};
};

export default Track;