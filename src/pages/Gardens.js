import React, { useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Garden from '../components/garden/Garden'
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {Redirect} from 'react-router-dom'
import Modal from '@material-ui/core/Modal';
import AddGarden from '../components/modals/AddGarden';




const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: 30
    },
    control: {
      padding: theme.spacing(2),
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
}));


function Gardens(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    if(!props.auth.uid){return <Redirect to="/login" /> }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const gardens  = props.gardens.slice().filter(g => g.owner == props.auth.uid || g.owner == null)

    return (
        <div style={{marginTop: 30}}>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={2}>
                        {gardens.map(garden=>{
                            return(
                                <Grid item key={garden.id}>
                                    <Garden garden={garden} />
                                </Grid>
                            ) 
                        })}
                    </Grid>
                </Grid>
            </Grid>
            <Fab color="primary" aria-label="add" className={classes.fab} style={{position: "fixed"}} onClick={handleOpen}>
                <AddIcon />  
            </Fab>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <AddGarden close={handleClose}/>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return{
      authError: state.auth.authError,
      auth: state.firebase.auth,
      gardens: state.firestore.ordered.gardens || []
    }
}
  
  
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'gardens' }
    ])
)(Gardens)
