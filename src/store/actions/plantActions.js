import firebase from 'firebase'

export const createPlant = (plant, gardenId) => {
    return (dispatch, getState) => {
      // Add plant image to storage
      firebase.storage().ref(`plant-${plant.image.name}`).put(plant.image)
        .then(()=>{
          let publicUrl = `https://storage.googleapis.com/planteneer.appspot.com/${(encodeURI(`plant-${plant.image.name}`)).replace(/\//g, "%2F")}`
          const firestore = firebase.firestore();
          // Add plant to databse
          firestore.collection('plants').add({
            name: plant.name,
            description: plant.description,
            image: publicUrl,
            garden: gardenId,
            createdAt: new Date()
          }).then((doc) => {
            dispatch({ type: 'CREATE_PLANT_SUCCESS' });
          }).catch(err => {
            dispatch({ type: 'CREATE_PLANT_ERROR' }, err);
          });
        }).catch((e) => console.log('uploading image error => ', e));
    }
  };
