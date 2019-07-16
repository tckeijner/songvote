import React from 'react';
import NavBar from '../NavBar';
import { Card, CardContent, CardActionArea, Button, Grid, Typography } from '@material-ui/core';
import 'typeface-roboto'
import classes from '../Styles';

class Home extends React.Component {
  render() {
    return (
      <div className={classes.root}>
        <NavBar />
        <Grid container spacing={3}>
          <Grid item sm>
            <Card className={classes.Card}>
            <CardActionArea>
                <Button
                onClick={this.props.onStart}
                variant="contained" >
                Start a new party
                </Button>
              </CardActionArea>
              <CardContent>
                <Typography>
                Create a new playlist and set up a Party PIN, which your guests can use to add more songs to your party playlist.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm>
          <Card className={classes.Card}>
          <CardActionArea>
              <Button
              onClick={this.props.onJoin}
              variant="contained">
              Join a party            
              </Button>
            </CardActionArea>
            <CardContent>
              <Typography>
                Log in to the current party playlist to add the songs you like!
              </Typography>
            </CardContent>

          </Card>
        </Grid>
        </Grid>
      </div>
    );
  };
};

export default Home;