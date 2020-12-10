import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Modal from '@material-ui/core/Modal';
import AddEntry from '../components/modals/AddEntry';
import EntryCard from '../components/cards/EntryCard';
import {deleteEntry} from '../store/actions/diaryActions'


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

function Diary(props) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    if(!props.auth.uid){return <Redirect to="/login" /> }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        console.log('State: '+open)
        setOpen(false);
    };

    const isMyDiaryEntry = (entry)=>{
        return entry.ownerId == props.auth.uid
    }

    if(!props.auth.uid){return <Redirect to="/login" /> }
    
    // Get all entries belonging to a user
    // Sorted in reverse
    const diary = props.diary.slice().filter(a => isMyDiaryEntry(a) ).slice().sort((a,b) => (a.createdAt.seconds < b.createdAt.seconds) ? 1 : -1).reverse()

    return (
        <div style={{margin: 'auto', marginTop: 30}}>
            {diary.map(entry =>{ 
                return (
                    <EntryCard entry={entry} key={entry.id} delete={props.deleteEntry}/>
                )
            })}

            <Fab color="primary" aria-label="add" className={classes.fab} style={{position: "fixed"}} onClick={handleOpen}>
                <AddIcon />
            </Fab>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <AddEntry close={handleClose}/>
            </Modal>
        </div>
    );
}


const mapStateToProps = (state) => {
  return{
    authError: state.auth.authError,
    auth: state.firebase.auth,
    diary: state.firestore.ordered.diary || []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteEntry: (entry) => dispatch(deleteEntry(entry))
  }
}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'diary' }
  ])
)(Diary)