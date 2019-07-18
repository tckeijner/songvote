import React from 'react';
import './Search.css';
import TrackList from '../TrackList/TrackList.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Card, CardContent } from '@material-ui/core';
import styles from '../Styles';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.term = {
            term: ''
        };

        this.handleTermChange = this.handleTermChange.bind(this);
        this.search = this.search.bind(this);
    };

    handleTermChange(event) {
        this.setState({term: event.target.value})
    };

    search() {
        this.props.onSearch(this.state.term)
    };

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    render() {
        return (
            <Card style={styles.card}>
                <CardContent>
                    <TextField placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
                    <Button style={styles.button} className="SearchButton" onClick={this.search}>SEARCH</Button>
                </CardContent>
                <CardContent className='SearchResults'>
                    <TrackList 
                        tracks={this.props.searchResults} 
                        isSearchResults={true} 
                        onAddTrack={this.props.onAddTrack}
                        isHostSearch={this.props.isHostSearch}
                        playlistId={this.props.playlistId}/>
                </CardContent>               
            </Card>
        );
    };
};

export default Search;