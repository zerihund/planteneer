import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import LoggedOutLinks from './LoggedOutLinks'
import LoggedInLinks from './LoggedInLinks';
import {signOut} from '../../store/actions/authActions'
import { connect } from 'react-redux'


function Navbar(props) {
  const {auth} = props
  return (
    <div>
      <AppBar position="static">
        { auth.uid ? 
        <LoggedInLinks />
        : 
        <LoggedOutLinks />}
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

