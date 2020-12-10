import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProfileCard from './../components/cards/ProfileCard'
import GardensCard from './../components/cards/GardensCard'
import DiaryCard from '../components/cards/DiaryCard'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: 30
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
}));

function Dashboard(props) {

    // const [totalGardens, setTotalGardens] = useState(0)
    // const [totalPlants, setTotalPlants] = useState(0)

    // useEffect(() => {
      
    // }, [])

    const classes = useStyles();
    if(!props.auth.uid){return <Redirect to="/login" /> }
    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    <Grid item>
                      {console.log(props.firebase)}
                        <ProfileCard user={props.user}/>
                    </Grid>
                    <Grid  item>
                        <GardensCard />
                    </Grid>
                    <Grid item>
                        <DiaryCard />
                    </Grid>
                </Grid>
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
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'plants' },
    { collection: 'gardens' }
  ])
)(Dashboard)


  