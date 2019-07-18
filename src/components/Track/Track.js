import React from 'react';
import './Track.css';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Spotify from '../../util/Spotify';
import styles from '../Styles';

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
			return <Fab className="Track-action" style={styles.fab} onClick={this.addTrackToPlaylist}><AddIcon/></Fab>
		} else if (this.props.isSearchResults === true) {
			return <Fab className="Track-action" style={styles.fab} onClick={this.addTrack}><AddIcon/></Fab>
		} else if (this.props.isYourSelection === true) {
			return <Fab className="Track-action" style={styles.fab} onClick={this.removeTrack}><DeleteIcon/></Fab>
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