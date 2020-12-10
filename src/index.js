import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import rootReducer from './store/reducers/rootReducer'
import thunk from 'redux-thunk'
import firebase from './utils/firebaseConfig'
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { applyMiddleware, createStore, compose } from 'redux';
import { reduxFirestore } from 'redux-firestore';
import {reactReduxFirebase} from 'react-redux-firebase'
import reportWebVitals from './reportWebVitals';

const theme = createMuiTheme({
  palette: {
     primary: {
        main: "#206a5d" 
               },
     secondary: {
        main: "#81b214" 
                }
           },
});

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk),
    reactReduxFirebase(firebase,{userProfile: 'users', useFirestoreForProfile: true,attachAuthIsReady: true}), // redux binding for firebase
    reduxFirestore(firebase)
  )
);

store.firebaseAuthIsReady.then(()=>{
  ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </ThemeProvider>,
    document.getElementById('root')
  )
})


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
