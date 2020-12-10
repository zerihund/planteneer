import firebase from 'firebase'

export const signIn = (credentials) => {
    return (dispatch, getState) => {
      firebase.auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      ).then((user) => {
            dispatch({ type: 'LOGIN_SUCCESS'});
      }).catch((err) => {
        dispatch({ type: 'LOGIN_ERROR', err });
      });
    }
  }
  
  export const signOut = () => {
    return (dispatch, getState) => {
      firebase.auth().signOut().then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' })
        console.log('logged out')
      });
    }
  }

  export const updateUser = (id, document) => {
      return (dispatch, getState) => {
          firebase.firestore().collection('users').doc(id).update(document)
              .then(doc =>{
                dispatch({ type: 'UPDATE_SUCCESS'});
              })
              .catch((err)=>{
                dispatch({ type: 'UPDATE_SUCCESS'});
              })
      }
      
  }

  export const updateProfilePic = (id, image) => {
      return (dispatch, getState) => {
          console.log(image)
          // Get reference for image
          let imgRef = firebase.storage().ref(`${id}-${image.name}`)
          imgRef.put(image)
            .then(() => {
              // Get public email and add it to the user document
              let publicUrl = `https://storage.googleapis.com/planteneer.appspot.com/${(encodeURI(`${id}-${image.name}`)).replace(/\//g, "%2F")}`;
              firebase.firestore().collection('users').doc(id).update({profile: publicUrl })
                .then(doc =>{
                  console.log(doc)
                  dispatch({ type: 'UPLOAD_SUCCESS'});
                })
                .catch((err)=>{
                  console.log(err)
                  dispatch({ type: 'UPLOAD_SUCCESS'});
                })
          }).catch((e) => console.log('uploading image error => ', e));
      }
      
  }
  
  export const signUp = (newUser) => {
    return (dispatch, getState) => {
      // Add user to Firebase authentication
      firebase.auth().createUserWithEmailAndPassword(
          newUser.email, 
          newUser.password
        ).then(resp => {
          // Add the new user to Firestore database
          return  firebase.firestore().collection('users').doc(resp.user.uid).set({
            firstName: newUser.name,
            lastName: newUser.surname,
            initials: newUser.name[0] + newUser.surname[0],
            name: newUser.email,
            points: 100 // Assign 100 points for registering
          });
        }).then(() => {
          dispatch({ type: 'SIGNUP_SUCCESS' });
        }).catch((err) => {
          console.log(err)
          dispatch({ type: 'SIGNUP_ERROR', err});
        });
    }
  }