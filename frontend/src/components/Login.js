import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { AutoComplete } from 'primereact/autocomplete';
import axios from "axios";

import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/auth';

export class Login extends Component {

    constructor() {
        super();
        this.state = {
            checkboxValue: [],
            username: 'admin',
            password: 'password',
            hidden: true,
           
        };

        this.toggleShow = this.toggleShow.bind(this);

    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
    };

    submitData = event => {
        //alert("U: " + this.state.username + "\nP: " + this.state.password)
        this.props.login(this.state.username, this.state.password);
    }

    toggleShow() {
        this.setState({ hidden: !this.state.hidden });
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }
        return (
            <div className="p-grid p-fluid" style={{ marginTop: '5%' }}>
                <div className="p-col"> </div>
                <div className="p-col-12 p-lg-6 p-md-6">
                    <div className="card card-w-title p-shadow-10">
                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-col"></div>
                            <div className="p-col"> <img src='/assets/layout/images/careta-logo.png' /></div>
                            <div className="p-col"></div>
                        </div>
                        <center><h3><b>Sign in</b></h3></center>
                        
                        <div className="p-grid p-fluid">
                            <div className="p-col" style={{ paddingLeft: '5%', paddingRight: '5%' }}>
                                <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>
                                    <InputText placeholder="Username" value={this.state.username} onChange={event => this.setState({ username: event.target.value })}/>
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
                                    <InputText placeholder="Password" type={this.state.hidden ? 'password' : 'text'} value={this.state.password} onChange={event => this.setState({ password: event.target.value })} />
                                    <Button icon="pi pi-eye" onClick={this.toggleShow}> </Button>
                                </div>
                            </div>
                        </div>

                        <div className="p-grid p-fluid">
                            <div className="p-field p-col"> </div>
                            <div className="p-field p-col">  <Button label="LOGIN" className="p-button-lg p-shadow-5" onClick={this.submitData}> </Button> </div>
                            <div className="p-field p-col"> </div>
                        </div>

                    </div>
                </div>
                <div className="p-col"> </div>
                
            </div>
            
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);