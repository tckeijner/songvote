import React from 'react';
import './Search.css';
import TrackList from '../TrackList/TrackList.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Card, CardContent, Typography } from '@material-ui/core';

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
            <Card>
                <CardContent>
                    <TextField placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
                    <Button className="SearchButton" onClick={this.search}>SEARCH</Button>
                </CardContent>
                <CardContent className='SearchResults'>
                <Typography variant="h4" >Search results</Typography>
                    <TrackList 
                        tracks={this.props.searchResults} 
                        isSearchResults={true} 
                        onAdd={this.props.onAdd}
                        isHostSearch={this.props.isHostSearch}/>
                </CardContent>               
            </Card>
        );
    };
};

export default Search;