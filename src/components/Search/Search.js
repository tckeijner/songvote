import React from 'react';
import './Search.css';
import TrackList from '../TrackList/TrackList.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Card, CardContent, CardActions } from '@material-ui/core';
import styles from '../Styles';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: 0
        };

        this.handleTermChange = this.handleTermChange.bind(this);
        this.search = this.search.bind(this);
    };

    handleTermChange(event) {
        this.setState({term: event.target.value})
    };

    search() {
        if (this.state.term === "") {
            alert("Enter a name or artist first")
        } else {
            this.props.onSearch(this.state.term)            
        }

    };

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    render() {
        return (
            <Card style={styles.card}>
                <CardContent>

                        <CardActions><TextField placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/></CardActions>
                        <CardActions><Button style={styles.searchButton} className="SearchButton" onClick={this.search}>SEARCH</Button></CardActions>

                </CardContent>
                <CardContent className='SearchResults'>
                    <TrackList 
                        tracks={this.props.searchResults} 
                        isSearchResults={true} 
                        onAddTrack={this.props.onAddTrack}
                        isHostSearch={this.props.isHostSearch}
                        playlistId={this.props.playlistId}
                        onAdd={this.props.onAdd}/>
                </CardContent>               
            </Card>
        );
    };
};

export default Search;