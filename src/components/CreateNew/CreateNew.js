import React from 'react';
import NavBar from '../NavBar'
import { TextField, Button, Typography } from '@material-ui/core';
import Search from '../Search/Search'
import 'typeface-roboto';

class CreateNew extends React.Component {
	render() {
		switch(this.props.hostStep) {
			case 1:
				return (
					<div>
						<NavBar />
						<TextField 
							id="playlist-name"
							label="Playlist name"
							className="text-field"
							value={this.props.playlistName}
							onChange={this.props.onPlaylistNameChange}
							margin="normal"/>
						<Button
							id="create-playlist"
							className="button"
							onClick={this.props.onCreate}>
							Create Playlist
						</Button>
				</div>
				);
				case 2: 
					return (
						<div>
							<NavBar />
							<Typography variant="h6">
								First, add some songs to your party playlist
							</Typography>
							<Button
								id="finish-playlist"
								className="button"
								onClick={this.props.onFinish}
								>
									Finish Playlist
								</Button>
							<Search 
								className='Search' 
								searchResults={this.props.searchResults} 
								onAdd={this.props.addTrack} 
								isHostSearch={this.props.isHostSearch}
								onSearch={this.props.onSearch}
								/>
						</div>
					);
				case 3:
					return (
						<div>
							<NavBar />
							<Typography variant="h6">
							Your party PIN:
						</Typography>
						<Typography variant="h3">
							{this.props.partyPin}
						</Typography>
						</div>
					);
				// default:
				// 	return (
				// 		<div></div>
				// 	)
		};
	};
};

export default CreateNew;