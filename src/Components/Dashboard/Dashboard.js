import React from 'react';
import Editor from './Editor';
import Header from './Header';
import Sidebar from './Sidebar';
import { motion } from 'framer-motion';
import { PageAnimation} from '../../Animations/PageAnimations';



const Dashboard = () => {

    return (
        <motion.div className="dashboard" variants={PageAnimation} initial="hidden" animate="show" exit="exit">
            <Sidebar />
            <Header  />
            <Editor />
        </motion.div>
    )
}



export default Dashboard;
