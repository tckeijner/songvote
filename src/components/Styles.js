import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    paddingLeft: 20
  },
  card: {
    minWidth: 275,
    padding: theme.spacing(2)
  },
}));

const styles = useStyles;

export default styles;