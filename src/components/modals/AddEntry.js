import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {createEntry} from '../../store/actions/diaryActions'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '80%',
    height: 150,
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    tabIndex: -1
  },
  text: {
    marginBottom: 15,
    width: '95%',
    minHeight: 100,
    margin: 'auto'
  },
  button: {
    marginBottom: 15,
    width: '40%',
    margin: 'auto'
  }
}));


function AddEntry(props) {
  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);
  const [entry, setEntry] = useState('')

  const handleClick = (e)=>{
        e.preventDefault()
        const newEntry = {entry}
        props.createEntry(newEntry)
        props.close()
  }

  return (
    <div style={modalStyle} className={classes.paper}>
      <form className={classes.form} noValidate>
            <TextField
                className={classes.text}
                id="outlined-multiline-flexible"
                label="New entry"
                multiline
                value={entry}
                onChange={(e)=>setEntry(e.target.value)}
                variant="outlined"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleClick}
            >
              Add Entry
            </Button>
          </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
        createEntry: (creds) => dispatch(createEntry(creds))
    }
  }
  
export default connect(null, mapDispatchToProps)(AddEntry)
