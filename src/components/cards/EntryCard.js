import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: "#eeffef",
    margin: 30,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function EntryCard(props) {
  const classes = useStyles();

  const date = new Date(props.entry.createdAt.seconds * 1000)

  const remove = function(){
    props.delete(props.entry)
  }
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h6">
            {props.entry.entry.slice(0,10)+'...'}
          </Typography>
          <Typography variant="body1" color="textPrimary" component="p" style={{textAlign: 'left'}}>
            {props.entry.entry}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography size="small" color="textPrimary">
          {date.toLocaleString()}
        </Typography>
        <Button size="small" color="textPrimary" onClick={remove}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default EntryCard
