import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  links: {
    textDecoration: 'none'
  }
});

function Garden(props) {
  const classes = useStyles();
  
  return (
      <a className={classes.links} href={`/garden/${props.garden.id}`}>
        <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Garden"
            height="140"
            image={props.garden.image}
            title="Garden Picture"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.garden.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {props.garden.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        </Card>
      </a>
    
  );
}

export default Garden
