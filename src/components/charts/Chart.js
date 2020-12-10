import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';

import Chart from "chart.js";

// Sets position for the modal
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
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function MyChart(props) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  useEffect(() => {
    // Create unique ID for chart
    var ctx = document.getElementById(`${props.mainData}-chart`).getContext('2d');
    new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            // Get labels (time stamps)
            labels: props.data.map((e)=>{return e.data.time.slice(10,16)}).slice(0,20).reverse(),
            datasets: [{
                label: props.mainData,
                borderColor: '#000000 ',
                // Get data to display, from sorted from latest to oldest
                data: props.data.map((e)=>{
                    return e.data[props.mainData] // return particular column from dataset
                }).slice(0,20).reverse(),
            }]
        },
    });
  });

  return (
        <div style={modalStyle} className={classes.paper}>
          {/* Display the chart */}
          <canvas id={`${props.mainData}-chart`} style={{maxWidth: 600, margin: 'auto'}}/>
        </div>
  );
}

export default MyChart