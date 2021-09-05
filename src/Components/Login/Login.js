import React, {  useState } from 'react';
import {Link,Redirect,withRouter } from 'react-router-dom';
import { ReactComponent as Illus} from './../../Assets/Svg/undraw_Notes_re_pxhw (1).svg';
import { ReactComponent as LoginIcon } from './../../Assets/Svg/log-in.svg';
import Axios from '../../services/axios';
import { useDispatch, connect, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import Loader from "react-loader-spinner";
import { motion } from 'framer-motion';
import { PageAnimation } from '../../Animations/PageAnimations';
import { toast } from 'react-toastify';

const Login = (props) => {

   

    const [loading, setLoading] = useState(false);
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    
    const dispatch = useDispatch();

    const LoginFunc = () => {
        if (!email || !password) {
            return toast.warn("Fill all the fields");
        }
        setLoading(true);
        Axios.post("/login", {
            email,
            password
        }).then(res => {
            localStorage.setItem('token', res.data.token);
            dispatch({
                type: actions.SET_USER,
                userId: res.data.user._id,
                userName: res.data.user.name,
                userEmail: res.data.user.email,
                notes: res.data.user.notes,
                token:res.data.token
            });
           
            props.history.push("/");
                
        
            toast.success('Logged in');

        }).catch(err => {
            console.log(err);
            toast.error("Something went wrong");
        }).finally(_ => setLoading(false));


    }
    const token = useSelector(state => state.Auth.token);
   


    return (
        <motion.div className="login-container" variants={PageAnimation} initial="hidden" animate="show" exit="exit" >
            {token && <Redirect to="/" />}
            <div className="illus">
                <Illus />
            </div>
            <div className="login-form">
                <div className="login-form-inner">
                    <h2>Login</h2>
                    <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button className="submit-btn" onClick={LoginFunc}>{ loading ? <Loader type="TailSpin" color="white" height={19} width={19} /> : <LoginIcon />}&nbsp;Login</button>
                    <Link to="/signup" className="no-account" >Dont Have an Account ? Create New one</Link>
                </div>

            </div>
        </motion.div>
    )
}

const mapStateToProps = state => {
    return {
        auth:state.Auth.isAuth
    }
}
export default withRouter(connect(mapStateToProps)(Login));
