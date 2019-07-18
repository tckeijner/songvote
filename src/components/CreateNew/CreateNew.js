import React from 'react';
import NavBar from '../NavBar'
import { TextField, Button, Typography, Grid, Card, CardContent, CardActionArea, Paper } from '@material-ui/core';
import Search from '../Search/Search'
import 'typeface-roboto';
import styles from '../Styles';

class CreateNew extends React.Component {
	render() {
		switch(this.props.hostStep) {
			case 1:
				return (
					<div>
						<NavBar />
						<Grid 
						container 
						style={styles.grid}
						direction="row"
						justify="center"
						alignItems="flex-start">
							<Card
							style={styles.card}>
								<CardContent>
									<Typography>
										First, pick a name and create your playlist
									</Typography>
								</CardContent>
								<CardActionArea>
								<TextField 
									id="playlist-name"
									label="Playlist name"
									className="text-field"
									value={this.props.playlistName}
									onChange={this.props.onPlaylistNameChange}
									margin="normal"/>
								</CardActionArea>
								<CardActionArea>
									<Button
										id="create-playlist"
										className="button"
										onClick={this.props.onCreate}
										variant="contained"
										style={styles.button}>
										Create Playlist
									</Button>
								</CardActionArea>
							</Card>
						</Grid>
					</div>
				);
				case 2: 
					return (
						<div>
							<NavBar />	
							<Grid 
							container 
							spacing={3}
							style={styles.grid}
							direction="row"
							justify="center"
							alignItems="flex-start">
								<Grid item xs={12}>
									<Paper style={styles.paper}>
										<Typography>
											Now, add some songs to your party playlist
										</Typography>
									</Paper>
								</Grid>
								<Grid item sm>
									<Search 
									className='Search' 
									searchResults={this.props.searchResults} 
									onAdd={this.props.addTrack} 
									isHostSearch={this.props.isHostSearch}
									onSearch={this.props.onSearch}
									playlistId={this.props.playlistId}
									/>
								</Grid>
								<Grid item sm>
									<Card style={styles.card}>
										<CardActionArea>
											<Button
											style={styles.button}
											variant="contained"
											id="finish-playlist"
											className="button"
											onClick={this.props.onFinish}>
												Finish Playlist
											</Button>
										</CardActionArea>
									</Card>
								</Grid>
							</Grid>
						</div>
					);
				case 3:
					return (
						<div>
							<NavBar />
							<Grid
							container 
							spacing={3}
							style={styles.grid}
							direction="row"
							justify="center"
							alignItems="flex-start">
								<Card
								style={styles.card}>
									<CardContent>
										<Typography variant="h6">
											Your party PIN:
										</Typography>
									</CardContent>
									<CardContent>
										<Typography variant="h3">
											{this.props.partyPin}
										</Typography>
									</CardContent>
									<CardContent>
										<Typography>
											Show this number to your guests. They can use it to log in on [URL] and add songs to you playlist.
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						</div>
					);
				default:
					return (
						<div></div>
					)
		};
	};
};

export default CreateNew;