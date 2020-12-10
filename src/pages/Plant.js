import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import Chart from '../components/charts/Chart'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import MoodIcon from '@material-ui/icons/Mood';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import Modal from '@material-ui/core/Modal';
import { Typography } from '@material-ui/core';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
	marginLeft: 'auto',
	marginRight: 'auto'
  },
  paper: {
	padding: theme.spacing(2),
	height: 50,
	width: '80%',
	margin: 'auto',
	textAlign: 'left',
	fontSize: 15,
	color: theme.palette.text.primary,
	backgroundColor: '#efefef'
  },
}));

function Plant(props) {
  	const classes = useStyles();

	const [data, setData] = useState([])
	const [open, setOpen] = useState(false);
	const [variable, setVariable] = useState('')


	const handleOpen = (el) => {
		setVariable(el)
		setOpen(true);
	};

	const handleClose = () => {
		console.log('State: '+open)
		setOpen(false);
	};

	const dataURL = 'https://us-central1-amiable-hydra-279814.cloudfunctions.net/mikrokosmos/api/read'
  
	useEffect(() => {
		axios.get(dataURL).then((response) => {
			const newData = response.data;
			console.log(newData)
			setData(newData);
		});
	  }, [])
	  
	let mainInfo
	if(data.length > 0){
		mainInfo = data[0].data
	}else{
		mainInfo = []
	}

	// Redirect to login page if not logged in
	if(!props.auth.uid){return <Redirect to="/login" /> }
	let plantId = props.match.params.id
	let plant = props.plants.slice().filter(p => p.id == plantId)[0] || []
	console.log(plant)

	return (
		<div className={classes.root}>
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<img src={plant.image || 'https://media.istockphoto.com/photos/tree-growth-three-steps-in-nature-and-beautiful-morning-lighting-picture-id956366756?k=6&m=956366756&s=612x612&w=0&h=sqi3kTfxi02Y-6xyyGmOjp9LI5ES_gipovhXenzaPPo='} alt="Plant" style={{height: 150}}></img>
			</Grid>

				{/* Main stats for plants */}
				<Grid item xs={12}>
					<Paper className={classes.paper} onClick={()=>handleOpen('co2')}>
						<Typography variant="body1" component="body1" align="center">
							 {'CO2: '+mainInfo.co2+'	'} 
						</Typography>
						<Badge color="primary">
						{mainInfo.co2 <= 2100 && mainInfo.co2 >=1200 ? <MoodIcon style={{ color: 'yellow' }}/> : <MoodBadIcon style={{ color: 'red' }}/>}
						</Badge>
					</Paper>
					
				</Grid>
				<Grid item xs={12}>
					<Paper className={classes.paper} onClick={()=>handleOpen('ph')}>
						{'PH: '+ mainInfo.ph+'	'}
						<Badge color="primary">
							{mainInfo.ph <= 7 && mainInfo.ph >=6 ? <MoodIcon style={{ color: 'green' }}/> : <MoodBadIcon style={{ color: 'red' }}/>}
						</Badge>
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<Paper className={classes.paper} onClick={()=>handleOpen('tempW')}>
						<Grid>
							{'Water Temperature: '+ mainInfo.tempW+'	'}
							<Badge color="primary">
							{mainInfo.tempW <= 24 && mainInfo.tempW >=16 ? <MoodIcon style={{ color: 'green' }}/> : <MoodBadIcon style={{ color: 'red' }}/>}
							</Badge>
						</Grid>	
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<Paper className={classes.paper} onClick={()=>handleOpen('temp')}>
						{'Room Temperature: '+mainInfo.temp+'	'}
						<Badge color="primary" align={'right'}>
						{mainInfo.temp <= 24 && mainInfo.temp >=15 ? <MoodIcon style={{ color: 'green' }}/> : <MoodBadIcon style={{ color: 'red' }}/>}
						</Badge>
					</Paper>
				</Grid>
				
			</Grid>
			<Button color="inherit" href="/stream">Time Lapse</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<Chart data={data} mainData={variable}/>
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
	firestoreConnect([{ collection: 'plants' }])
)(Plant)
  






