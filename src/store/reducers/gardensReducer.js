const initState = {
    gardens: []
}

const gardensReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_GARDEN_SUCCESS':
            return state
        case 'CREATE_GARDEN_ERROR':
            return state
        default:
            return state
    }
}