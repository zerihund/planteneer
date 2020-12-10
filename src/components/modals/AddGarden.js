import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {createGarden} from '../../store/actions/gardensActions'

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
    width: '50%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function AddGarden(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')

  const handleClick = (e)=>{
        if(name.length > 0 && description.length > 0 && image !== null){
            const garden = {name, description, image}
            props.createGarden(garden)
            return props.close()
        }
        e.preventDefault()
  }

  return (
    <div style={modalStyle} className={classes.paper}>
        <Typography component="h1" variant="h5">
            Add new garden
        </Typography>
      <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Garden Name"
              name="name"
              onChange={(e)=>setName(e.target.value)}
              autoComplete="name"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="description"
              onChange={(e)=>setDescription(e.target.value)}
              label="Description"
              type="text"
              id="description"
            />
            <label for="fileToUpload">Plant Image</label>
						<input type="File" name="fileToUpload"  id="fileToUpload" onChange={(e)=>{setImage(e.target.files[0])}}/>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleClick}
            >
              Create Garden
            </Button>
          </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
        createGarden: (creds) => dispatch(createGarden(creds))
    }
  }
  
export default connect(null, mapDispatchToProps)(AddGarden)
