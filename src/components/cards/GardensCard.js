import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';


const useStyles = makeStyles({
  root: {
    width: 345,
    height: 150
  },
  media: {
    width: 345,
  },
});

function MyCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root} >
        <a href="/gardens">
          <img
            className={classes.media}
            src="https://storage.googleapis.com/planteneer.appspot.com/garden.png"
            title="Gardens Icon"
          />
        </a>
    </Card>
  );
}

export default MyCard