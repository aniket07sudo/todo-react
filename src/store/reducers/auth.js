import * as actionTypes from '../actions';
const initialState = {
    userId:null,
    userName:null,
    userEmail:null,
    activeNote: null,
    notes: [],
    token: null,
    isAuth: false,
    sideLoad:false
}

const reducer = (state = initialState,action) => {
    switch(action.type) {
        case actionTypes.SET_USER:
            return{
                ...state,
                userId:action.userId,
                userName:action.userName,
                userEmail: action.userEmail,
                notes: action.notes
            }
        case 'SET_TOKEN':
            return {
                ...state,
                token:action.token
            }
        case 'SET_AUTH':
            return {
                ...state,
                isAuth:action.auth
            }
        case 'SET_NOTE':
            return {
                ...state,
                activeNote:action.note
            }
        case 'CREATE_NEW':
            return {
                ...state,
                activeNote:null
            }
        case 'ADD_NEW_NOTE':
            return {
                ...state,
                notes:[action.NoteObj,...state.notes]

            }
        case 'SET_NOTES':
            return {
                ...state,
                notes:action.notes
            }
        case 'SIDE_LOAD_START':
            return {
                ...state,
                sideLoad:true
            }
        case 'SIDE_LOAD_END':
            return {
                ...state,
                sideLoad:false
            }
        default:
            return initialState;
    }
}

export default reducer;