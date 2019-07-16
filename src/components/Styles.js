import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    minWidth: 275,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10
  },
}));

const classes = useStyles;

export default classes;