import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import {Redirect, useParams} from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Modal from '@material-ui/core/Modal';
import AddPlant from '../components/modals/AddPlant'



const useStyles = makeStyles((theme)=>({
  root: {
    width: 345,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  links: {
    textDecoration: 'none',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30
  }
}));

function Garden(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const {id} = useParams()

  const handleOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  if(!props.auth.uid){return <Redirect to="/login" /> }
  
  // Filter out plants belonging to a certain ID
  const plants = props.plants.slice().filter(p => p.garden == id)

  return (
    <div style={{margin: 'auto'}}>
        <Grid container style={{margin: 'auto'}} spacing={2}>
                {/* Iterate though all the plants and display them */}
                {plants.map(plant =>{
                    return (
                        <a className={classes.links} key={plant.id} href={`/plant/${plant.id}`}>
                            <Grid item xs={12} >
                        <Card className={classes.root}  style={{margin: 'auto'}}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image={plant.image}
                                title="Contemplative Reptile"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {plant.name} 
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        </Grid>
                        </a>
                        
                    )
                })}
        </Grid>
        {plants.length === 0 ? <h3>No Plants Available</h3> : null}


        {/* Remove ability to add plants if the current garden is Default Garden*/}
        {id !== 'Fnrqnp9yKgEupd5VbJh3'? 
        <Fab color="primary" aria-label="add" className={classes.fab} style={{position: "fixed"}} onClick={handleOpen}>
            <AddIcon />
        </Fab>
        :
        null}
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <AddPlant close={handleClose} gardenId={id}/>
        </Modal>
    </div>
  );
}


const mapStateToProps = (state) => {
  return{
    authError: state.auth.authError,
    auth: state.firebase.auth,
    plants: state.firestore.ordered.plants || []
  }
}


export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'plants' }
  ])
)(Garden)