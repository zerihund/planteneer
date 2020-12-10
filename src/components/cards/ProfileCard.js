import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme)=>({
  root: {
    width: 345,
    height: 150
  },
  media: {
    width: 100,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
}));

function ProfileCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Grid container>
        <Grid item xs={5}>
            <Avatar className={classes.avatar} src={props.user.profile || "https://img.pngio.com/points-iconpng-roblox-point-icon-png-420_420.jpg"} />
        </Grid>
        <Grid item xs={7} style={{marginTop: 50}}>
          <Typography gutterBottom variant="h5" component="h5" align="left">
              {props.user.firstName + ' ' + props.user.lastName}
            </Typography>
          <Typography gutterBottom variant="h6" component="h6" align="left">
            {/* Will add real points once function is up */}
            Points: {Math.floor((Math.random() * 100) + 1)} 
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default ProfileCard