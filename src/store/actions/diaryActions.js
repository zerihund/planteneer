import firebase from 'firebase'

export const createEntry = (entry) => {
    return (dispatch, getState) => {
      const firestore = firebase.firestore();
      const userId = getState().firebase.auth.uid;
      // Add diary entry to database
      firestore.collection('diary').add({
        ...entry,
        ownerId: userId,
        createdAt: new Date()
      }).then(() => {
        dispatch({ type: 'CREATE_ENTRY_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'CREATE_ENTRY_ERROR' }, err);
      });
    }
  };

export const deleteEntry = (entry) => {
  return (dispatch, getState) => {
    const firestore = firebase.firestore();
    const res = firestore.collection('diary').doc(entry.id).delete()

    if(res){
      dispatch({type: 'DELETE_ENTRY_SUCCESS'})
    }else{
      dispatch({type: 'DELETE_ENTRY_FAIL'})
    }
  }
};