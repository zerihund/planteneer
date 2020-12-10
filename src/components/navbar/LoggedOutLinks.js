import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Displays links for non-authenticated users

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function LoggedOutLinks() {
  const classes = useStyles();

  return (
    <div>
      <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Planteneer
          </Typography>
          <Button color="inherit" href="/login">Login</Button>
          <Button color="inherit" href="/register">Register</Button>
      </Toolbar>
    </div>
  )
}

export default LoggedOutLinks
