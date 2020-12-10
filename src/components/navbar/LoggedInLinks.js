import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Drawer from '../drawer/Drawer'
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {signOut} from '../../store/actions/authActions'
import { connect } from 'react-redux'

// This will display the nav links to to
// logged in users


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

function LoggedInLinks(props) {
  const classes = useStyles();
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
  return (
    <div>
      {isMobile ? 
        <Toolbar>
          <Drawer /> 
          <Typography className={classes.title}>
              Planteneer
          </Typography>
          <Button edge="end" color="inherit" href="/"><HomeIcon /></Button>
          <Button edge="end" color="inherit" onClick={props.signOut}><ExitToAppIcon /></Button>
        </Toolbar>
      :
      <Toolbar>
        <Typography className={classes.title}>
          Planteneer
        </Typography>
        <Button edge="end" color="inherit" href="/"><HomeIcon /></Button>
        <Button edge="end" color="inherit" onClick={props.signOut}><ExitToAppIcon /></Button>
      </Toolbar>
      }
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null,mapDispatchToProps)(LoggedInLinks)