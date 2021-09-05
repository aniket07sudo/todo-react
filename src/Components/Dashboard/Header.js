import { motion } from 'framer-motion';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link ,withRouter} from 'react-router-dom';
import { ReactComponent as Logout } from '../../Assets/Svg/log-out.svg';
import { ReactComponent as Logo } from '../../Assets/Svg/new_logo.svg';



const Header = ({ history }) => {

    const dispatch = useDispatch();

    const name = useSelector(state => state.Auth.userName);
    
    const logOut = () => {
        localStorage.removeItem('token');
        dispatch({
                type: 'SET_TOKEN',
                token:null
            })
        history.push("/login");

    }


    return (
        <motion.div className="Header" initial={{y:-30,opacity:0}} animate={{opacity:1,y:0,transition:{duration:.8,ease:"easeOut"}}} exit={{y:-30,opacity:0}} >
            <div className="header-inner">
                {/* <h1>Welcome, {name}</h1> */}
                <Logo width="40" />
                <p>Aniket Note's</p>
                <div className="flex-align" style={{gap:5}}>
                    <span>Welcome Back {name} !</span>&nbsp;&nbsp;
                    <Link to="/login" onClick={logOut} ><Logout /></Link>
                    </div>
            </div>
            
        </motion.div>
    )
}
export default withRouter(Header);
