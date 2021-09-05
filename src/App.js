import React , {useEffect} from 'react';
import { Switch, Route,withRouter } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import { AnimatePresence } from 'framer-motion';
import { checkAuth } from '../src/store/actions/auth';
import { connect } from 'react-redux';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ToastContainer } from 'react-toastify';
import "./styles/main.scss";
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './Components/ProtectedRoutes';

function App(props) {


  useEffect(() => {
    props.onAutoSign();
    }, [])
  
  return (
    <div className="App">
      <AnimatePresence exitBeforeEnter>
        <Switch location={props.location} key={props.location.key}>
        
          {/* <Route path="/" component={Dashboard} exact /> */}
          <ProtectedRoute path="/" component={Dashboard} exact />
      <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup} />
        </Switch>
      </AnimatePresence>
      <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
        pauseOnHover
        limit={1}
        />
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSign:() => dispatch(checkAuth())
  }
}

export default withRouter(connect(null,mapDispatchToProps)(App));
