import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import axios from "axios";

import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/auth';

export class Register extends Component {

    constructor() {
        super();
        this.state = {
            checkboxValue: [],
            gender: [{ name: 'Female' }, {name: 'Male' }],
            mygender: null,
            username: 'careta',
            password: 'mypasscar',
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
            return <Redirect to="/login" />;
        }
        return (
            <div className="p-grid p-fluid" >
                
                <div className="p-col-12">
                    <div className="card card-w-title p-shadow-10">
                        <center><h3><b>Registration Form</b></h3></center>
                        
                        <div className="p-grid p-fluid">
                            <div className="p-col-12 p-md-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '5%' }}>
                                <h6><b>Name:</b></h6>
                                <InputText placeholder="Name" />
                            </div>
                        </div>

                        <div className="p-grid p-fluid">
                            <div className="p-col-12 p-md-6" style={{ paddingLeft: '5%',  marginTop: '2%' }}>
                                <h6><b>Slug:</b></h6>
                                <InputText placeholder="Slug" />
                            </div>
                            <div className="p-col-12 p-md-6" style={{ paddingRight: '5%', marginTop: '2%' }}>
                                <h6><b>Gender:</b></h6>
                                <Dropdown valeu={this.state.mygender} options={this.state.gender} optionLabel="name" placeholder="Select Gender" onChange={event => this.setState({ mygender: event.target.value })} />
                            </div>
                        </div>

                        <div className="p-grid p-fluid">
                            <div className="p-col-12 p-md-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                                <h6><b>Company:</b></h6>
                                <InputText placeholder="Company" />
                            </div>
                        </div>

                        <div className="p-grid p-fluid">
                            <div className="p-col-12 p-md-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                                <h6><b>Position:</b></h6>
                                <InputText placeholder="Position" />
                            </div>
                        </div>

                        <div className="p-grid p-fluid">
                            <div className="p-col-12 p-md-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                                <h6><b>Address:</b></h6>
                                <InputText placeholder="Address" />
                            </div>
                        </div>

                        <div className="p-grid p-fluid">
                            <div className="p-col-12 p-md-6" style={{ paddingLeft: '5%', marginTop: '2%' }}>
                                <h6><b>Phone Number:</b></h6>
                                <InputText placeholder="Phone Number" />
                            </div>
                            <div className="p-col-12 p-md-6" style={{ paddingRight: '5%', marginTop: '2%' }}>
                                <h6><b>Birthday:</b></h6>
                                <InputMask mask="99/99/9999" placeholder="MM/DD/YYYY" />
                            </div>
                        </div>

                        <div className="p-grid p-fluid">
                            <div className="p-field p-col"> </div>
                            <div className="p-field p-col"> </div>
                            <div className="p-field p-col" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}> <Button label="REGISTER" className="p-button-md p-shadow-5" > </Button> </div>
                        </div>

                    </div>
                </div>
                

            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Register);