import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { compose } from 'redux'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: 30
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
      large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
      },
      profilepic: {
        borderRadius: '50%',
        height: 150,
        width: 150,
        margin: 'auto',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'multiply',
        verticalAlign: 'middle',
        textAlign: 'center',
        color: 'transparent',
        transition: 'all .3s ease',
        textDecoration: 'none',
        cursor: 'pointer'
    }
}));

function Profile(props) {
    const [email, setEmail] = useState(props.user.name)
    const [firstName, setFirstName] = useState(props.user.firstName)
    const [lastName, setLastName] = useState(props.user.lastName)


    const classes = useStyles();

    if(!props.auth.uid){return <Redirect to="/login" /> }
    return (
        <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} component={Paper} elevation={6} square>
        <div className={classes.paper}>

        <div className={classes.profilepic} style={ {backgroundImage: `url("${props.user.profile}")` }}>
        </div>

          {/* <Avatar alt="Profile Picture" src={props.user.profile || 'https://firebasestorage.googleapis.com/v0/b/planteneer.appspot.com/o/default-icon.png?alt=media'} className={classes.large} /> */}
          <Typography component="h1" variant="h5">
            Profile
          </Typography>

          <Typography component="p" variant="subtitle1">
            Points: {props.user.points}
          </Typography>
          <form className={classes.form} noValidate>
          <TextField
              variant="outlined"
              margin="normal"
              disabled
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              disabled
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              onChange={(e)=>setLastName(e.target.value)}
              autoComplete="email"
              autoFocus
              value={lastName}
            />
            <TextField
              variant="outlined"
              margin="normal"
              disabled
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
            />
            <Button
              type="submit"
              fullWidth
              href="/profileEdit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Edit Profile
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
    )
}

const mapStateToProps = (state) => {
    console.log(state.firebase.profile)
    return{
      authError: state.auth.authError,
      auth: state.firebase.auth,
      user: state.firebase.profile
    }
  }

export default compose(
  connect(mapStateToProps, null)
)(Profile)


  