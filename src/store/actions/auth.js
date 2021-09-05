// import axios from 'axios';
import Axios from './../../services/axios';



export const checkAuth = () => {
    return dispatch => {
        Axios.get("/getUser").then(res => {
            const token = localStorage.getItem('token');
            dispatch({
                type: 'SET_TOKEN',
                token
            })


             dispatch({
                type: 'SET_USER',
                userId: res.data.currentUser.id,
                userName: res.data.currentUser.name,
                userEmail: res.data.currentUser.email,
                notes: res.data.currentUser.notes
            });
            console.log(res);
            
        }).catch(err => {
            console.log(err);
        })
        
    }
}
