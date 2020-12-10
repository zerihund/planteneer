const initState = {
    diary: []
}

const diaryReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_ENTRY_SUCCESS':
            return state
        case 'CREATE_ENTRY_ERROR':
            return state
        case 'DELETE_ENTRY_SUCCESS':
            return state
        case 'DELETE_ENTRY_FAIL':
            return state
        default:
            return state
    }
}