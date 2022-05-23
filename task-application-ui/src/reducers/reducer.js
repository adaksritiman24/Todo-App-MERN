import ActionTypes from "../actions/actions";

const reducer = (state, action)=> {
    switch(action.type) {
        case ActionTypes.SET_AUTH_TOKEN:
            return {
                ...state, token : action.payload
            }
        case ActionTypes.SET_NAME :
            return {
                ...state, name : action.payload
            }   
        case ActionTypes.SET_TODO_LISTS :
            return {
                ...state, todoLists : action.payload
            }   

        default:
            return state;    
    }
}

export default reducer;