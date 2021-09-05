import React , {useState} from 'react';
import {Link } from 'react-router-dom';
import { ReactComponent as Illus} from './../../Assets/Svg/undraw_Notes_re_pxhw (1).svg';
import { ReactComponent as LoginIcon } from './../../Assets/Svg/log-in.svg';
import { PageAnimation} from '../../Animations/PageAnimations';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Axios from '../../services/axios';
import Loader from "react-loader-spinner";




const Signup = (props) => {

       const [loading, setLoading] = useState(false);
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [password, setPassword] = useState('');

    const SignupFunc = () => {
        if (!email || !name || !password) {
            return toast.warn("Fill all the fields");
        }
        setLoading(true);
            Axios.post("/signup", {
            name,
            email,
            password
        }).then(res => {
           
            toast.success("Registered Successfully");
            props.history.push("/login");

        }).catch(err => {
            toast.error(err.response.data.message);
        }).finally(_ => setLoading(false));


    }



    return (
        <motion.div className="login-container" variants={PageAnimation} initial="hidden" animate="show" exit="exit" >
            <div className="illus">
                <Illus />
            </div>
            <div className="login-form">
                <div className="login-form-inner">
                    <h2>Signup</h2>
                    <input type="text" placeholder="UserName" autoComplete="off" onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder="Email" autoComplete="off" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" autoComplete="off" onChange={(e) => setPassword(e.target.value)} />
                    <button className="submit-btn" onClick={SignupFunc}>{loading ? <Loader type="TailSpin" color="white" height={19} width={19} /> : <LoginIcon />  }&nbsp;Signup</button>
                    <Link to="/login" className="no-account"  >Have an Account ? Login Here</Link>
                </div>

            </div>
        </motion.div>
    )
}
export default Signup;
