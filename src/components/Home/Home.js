import React from 'react';
import NavBar from '../NavBar';
import { Card, Button } from '@material-ui/core';
import 'typeface-roboto'

class Home extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Card>
          <Button
            onClick={this.props.onStart}>
          Start a new party
          </Button>
          Create a new playlist and set up a Party PIN, which your guests can use to add more songs to your party playlist.
        </Card>
        <Card>
          <Button
            onClick={this.props.onJoin}>
          Join a party            
          </Button>
          Log in to the current party playlist to add the songs you like!
        </Card>
      </div>
    );
  };
};

export default Home;