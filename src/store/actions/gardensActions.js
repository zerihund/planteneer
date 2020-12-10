import firebase from 'firebase'

export const createGarden = (garden) => {
    return (dispatch, getState) => {
      // When adding a garden, the picture is uploaded first and
      // if successful, the new garden is added to the database

      // Upload image
      firebase.storage().ref(`garden-${garden.image.name}`).put(garden.image)
        .then(()=>{
          let publicUrl = `https://storage.googleapis.com/planteneer.appspot.com/${(encodeURI(`garden-${garden.image.name}`)).replace(/\//g, "%2F")}`
          const firestore = firebase.firestore();
          const userId = getState().firebase.auth.uid;
          // Add garden to to databse
          firestore.collection('gardens').add({
            name: garden.name,
            description: garden.description,
            image: publicUrl,
            owner: userId,
            createdAt: new Date()
          }).then(() => {
            dispatch({ type: 'CREATE_GARDEN_SUCCESS', garden });
          }).catch(err => {
            dispatch({ type: 'CREATE_GARDEN_ERROR', err });
          });
      }).catch((e) => console.log('uploading image error => ', e));
    }
  };