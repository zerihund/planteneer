import React from 'react'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


function Stream() {
    return (
        <div>
            <h3 style={{aligh: 'center'}}>Timeline</h3>
            <Grid container>
                <Grid item sm={12} md={4} style={{margin: 'auto'}}>
                    <img src="https://storage.googleapis.com/planteneer.appspot.com/third.jpg" style={{width: '80%'}}/>
                    <p>Today</p>
                </Grid>

                <Grid  item sm={12} md={4} style={{margin: 'auto'}}>
                    <img src="https://storage.googleapis.com/planteneer.appspot.com/seconf.jpg" style={{width: '80%'}}/>
                    <p>3 days ago</p>
                </Grid>

                <Grid  item sm={12} md={4} style={{margin: 'auto'}}>
                    <img src="https://storage.googleapis.com/planteneer.appspot.com/first.jpg" style={{width: '80%'}}/>
                    <p>7 days ago</p>
                </Grid>

            </Grid>
        </div>
    )
}

export default Stream
