import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import CreateIcon from '@material-ui/icons/Create';
import EcoIcon from '@material-ui/icons/Eco';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme)=>({
  list: {
    width: 200,
  },
  root: {
    flexGrow: 1,
    backgroundColor: 'blue',
  },
  fullList: {
    width: 'auto',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    alignSelf: 'left'
  },
  paper: {
    background: "#206a5d"
  },
  white: {
    color: '#ffffff'
  }
}))

function DrawerMenu() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({left: open });
  };

  // List of links to display
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText classes={{ primary: classes.white }} primary={'Home'} />
          </ListItem>
          <ListItem button component={Link} to="/gardens">
            <ListItemIcon><EcoIcon /></ListItemIcon>
            <ListItemText classes={{ primary: classes.white }} primary={'Gardens'} />
          </ListItem>
          <ListItem button component={Link} to="/diary">
          <ListItemIcon><CreateIcon /></ListItemIcon>
            <ListItemText classes={{ primary: classes.white }} primary={'Diary'}/>
          </ListItem>
          <ListItem button component={Link} to="/profile">
            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
            <ListItemText classes={{ primary: classes.white }} primary={'Profile'} />
          </ListItem>
      </List>
    </div>
  );

  return (
    <div>
        <React.Fragment key={'left'}>
        <IconButton edge="start" onClick={toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
         </IconButton>
         <Drawer anchor={'left'} classes={{ paper: classes.paper }} open={state['left']} onClose={toggleDrawer('left', false)}>
            {list('left')}
          </Drawer>
        </React.Fragment>
    </div>
  );
}

export default DrawerMenu
