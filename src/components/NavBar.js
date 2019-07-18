import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import styles from './Styles';

export default function NavBar() {
  return (
    <div style={styles.root}>
      <AppBar position="static" color="primary" style={styles.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            SongVote
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}