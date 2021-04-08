import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Toasts from './Toasts';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/auth';

export const Login = (props) => {

    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('password');
    const [passwordShown, setPasswordShown] = useState(true);
    
    const propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
    };

    const submitData = event => {
        //alert("U: " + this.state.username + "\nP: " + this.state.password)
        props.login(username, password);
    }

    const keyPress = event => {
        if(event.key === "Enter"){
            //console.log("key press", event.key);
            submitData();
        }
    }

    const toggleShow = () => {
        setPasswordShown(passwordShown ? false : true);
    }

    if (props.isAuthenticated) {
        return <Redirect to="/" />;
    }
    return (
        <div className="p-grid p-fluid" style={{ marginTop: '5%' }}>
            <Toasts />
            <div className="p-col"> </div>
            <div className="p-col-12 p-lg-8 p-md-8 p-sm-8" style={{ paddingLeft: '5%', paddingRight: '5%' }}>
                <div className="card card-w-title p-shadow-10">
                    <div className="p-fluid p-grid">
                        <div className="p-col"></div>
                        <div className="p-col">
                            <center>
                                <div><img src='/assets/layout/images/careta-logo.png' /></div>
                                <div><label style={{ fontSize: '25px', fontWeight: 'bold' }}>Sign in</label></div>
                            </center>
                        </div>
                        <div className="p-col"></div>
                    </div>
                    
                    <div className="p-grid p-fluid">
                        <div className="p-col" style={{ paddingLeft: '5%', paddingRight: '5%' }}>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>
                                <InputText placeholder="Email or Username or Phone " value={username} onChange={event => setUsername(event.target.value)} onKeyPress={keyPress}/>
                            </div>
                        </div>
                    </div>

                    <div className="p-grid p-fluid">
                        <div className="p-col"> </div>
                    </div>

                    <div className="p-grid p-fluid">
                        <div className="p-col" style={{ paddingLeft: '5%', paddingRight: '5%' }}>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-lock"></i>
                                </span>
                                <InputText placeholder="Password" type={passwordShown ? 'password' : 'text'} value={password} onChange={event => setPassword(event.target.value)} onKeyPress={keyPress}/>
                                <Button icon={passwordShown ? 'pi pi-eye' : 'pi pi-eye-slash'} onClick={toggleShow}> </Button>
                            </div>
                        </div>
                    </div>

                    <div className="p-grid p-fluid">
                        <div className="p-field p-col"> </div>
                        <div className="p-field p-col">  <Button label="LOGIN" className="p-button-lg p-shadow-5" onClick={submitData} > </Button> </div>
                        <div className="p-field p-col"> </div>
                    </div>

                </div>
            </div>
            <div className="p-col"></div>
        </div>
    );
    
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);

//export default Login;
