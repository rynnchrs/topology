import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { Toast } from 'primereact/toast';
import axios from "axios";

export class Register extends Component {

    constructor() {
        super();
        this.state = {
            first_name: 'myfirst',
            last_name: 'mylast',
            email: 'myemail@gmail.com',
            username: 'usersa',
            password: 'qwerty12345()',
            genderOptions: [{ name: 'F' }, {name: 'M' }],
            gender: null,
            company: 'com',
            position: 'pos',
            address: 'add',
            phone: '09123456789',
            birthday: '7777-77-77',
            hidden: true,
            toast: React.createRef(null),
        };

        this.toggleShow = this.toggleShow.bind(this);

    }

    submitData = event => {
        if (this.state.firstname == "") {
            this.state.toast.current.show({ severity: 'warn', summary: 'Empty Field', detail: 'Firstname is required.', life: 5000 });
        } else if (this.state.lastname == "") {
            this.state.toast.current.show({ severity: 'warn', summary: 'Empty Field', detail: 'Lastname is required.', life: 5000 });
        } else if (this.state.email == "") {
            this.state.toast.current.show({ severity: 'warn', summary: 'Empty Field', detail: 'Email is required.', life: 5000 });
        } else if (this.state.username == "") {
            this.state.toast.current.show({ severity: 'warn', summary: 'Empty Field', detail: 'Username is required.', life: 5000 });
        } else if (this.state.password == "") {
            this.state.toast.current.show({ severity: 'warn', summary: 'Empty Field', detail: 'Password is required.', life: 5000 });
        } else if (this.state.gender == null) {
            this.state.toast.current.show({ severity: 'warn', summary: 'No Selected', detail: 'Please select a gender.', life: 5000 });
        } else if (this.state.company == "") {
            this.state.toast.current.show({ severity: 'warn', summary: 'Empty Field', detail: 'Company is required.', life: 5000 });
        } else if (this.state.position == "") {
            this.state.toast.current.show({ severity: 'warn', summary: 'Empty Field', detail: 'Position is required.', life: 5000 });
        } else if (this.state.address == "") {
            this.state.toast.current.show({ severity: 'warn', summary: 'Empty Field', detail: 'Address is required.', life: 5000 });
        } else if (this.state.phone == "") {
            this.state.toast.current.show({ severity: 'warn', summary: 'Empty Field', detail: 'Phone Number is required.', life: 5000 });
        } else if (this.state.birthday == "") {
            this.state.toast.current.show({ severity: 'warn', summary: 'Empty Field', detail: 'Birthday is required.', life: 5000 });
        } else {
            let token = localStorage.getItem("token");
            console.log('the token: ' + token);

            const { username, email, first_name, last_name, password, company, position, address, phone, birthday } = this.state;

            const gender = this.state.gender.name;
            const user_info = { company, position, gender, birthday, phone, address };

            const config = {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
            };

            // Request Body
            const body = JSON.stringify({ username, email, first_name, last_name, password, user_info });
            console.log('body: ' + body);
            axios
                .post('http://127.0.0.1:8000/api/register/', body, config)
                .then((res) => {
                    console.log('succ: ');
                    console.log(res.data)
                    this.state.toast.current.show({ severity: 'success', summary: 'Successfully Registered', detail: 'Account is ready to use.', life: 5000 });
                })
                .catch((err) => {
                    console.log('err: ');
                    console.log(err.response)
                    if (err.response.data.username) {
                        this.state.toast.current.show({ severity: 'error', summary: 'Username', detail: `${err.response.data.username.join()}`, life: 5000 });
                    } else if (err.response.data.email) {
                        this.state.toast.current.show({ severity: 'error', summary: 'Email', detail: `${err.response.data.email.join()}`, life: 5000 });
                    } else if (err.response.data.password) {
                        this.state.toast.current.show({ severity: 'error', summary: 'Password', detail: `${err.response.data.password.join()}`, life: 5000 });
                    } else if (err.response.data.user_info.birthday) {
                        //this.state.toast.current.show({ severity: 'error', summary: 'Birthday', detail: "Invalid Birthday", life: 3000 });
                        this.state.toast.current.show({ severity: 'error', summary: 'Birthday', detail: `${err.response.data.user_info.birthday.join()}`, life: 5000 });
                    }
                });
        }
    }

    toggleShow() {
        this.setState({ hidden: !this.state.hidden });
    }

    render() {
        return (
            <div className="p-grid p-fluid" >
                <Toast ref={this.state.toast} />
                <div className="p-col-12">
                    <div className="card card-w-title p-shadow-10">
                        <center><h3><b>Registration Form</b></h3></center>

                        <div className="p-grid p-fluid">
                            <div className="p-col-12 p-md-6" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                                <h6><b>First Name:</b></h6>
                                <InputText placeholder="First Name" value={this.state.first_name} onChange={event => this.setState({ first_name: event.target.value })} />
                            </div>
                            <div className="p-col-12 p-md-6" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                                <h6><b>Last Name:</b></h6>
                                <InputText placeholder="Last Name" value={this.state.last_name} onChange={event => this.setState({ last_name: event.target.value })} />
                            </div>
                        </div>
                        
                        <div className="p-grid p-fluid">
                            <div className="p-col-12 p-md-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                                <h6><b>Email:</b></h6>
                                <InputText placeholder="Email" value={this.state.email} onChange={event => this.setState({ email: event.target.value })} />
                            </div>
                        </div>

                        <div className="p-grid p-fluid">
                            <div className="p-col-12 p-md-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                                <h6><b>Username:</b></h6>
                                <InputText placeholder="Username" value={this.state.username} onChange={event => this.setState({ username: event.target.value })} />
                            </div>
                        </div>

                        <div className="p-grid p-fluid">
                            <div className="p-col-12 p-md-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                                <h6><b>Password:</b></h6>
                                <div className="p-inputgroup">
                                    <InputText placeholder="Password" type={this.state.hidden ? 'password' : 'text'} value={this.state.password} onChange={event => this.setState({ password: event.target.value })} />
                                    <Button icon="pi pi-eye" onClick={this.toggleShow}> </Button>
                                </div>
                            </div>
                        </div>

                        <div className="p-grid p-fluid">
                            <div className="p-col-12 p-md-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                                <h6><b>Gender:</b></h6>
                                <Dropdown value={this.state.gender} options={this.state.genderOptions} optionLabel="name" placeholder="Select Gender" onChange={event => this.setState({ gender: event.target.value })} />
                            </div>
                        </div>

                        <div className="p-grid p-fluid">
                            <div className="p-col-12 p-md-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                                <h6><b>Company:</b></h6>
                                <InputText placeholder="Company" value={this.state.company} onChange={event => this.setState({ company: event.target.value })} />
                            </div>
                        </div>

                        <div className="p-grid p-fluid">
                            <div className="p-col-12 p-md-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                                <h6><b>Position:</b></h6>
                                <InputText placeholder="Position" value={this.state.position} onChange={event => this.setState({ position: event.target.value })} />
                            </div>
                        </div>

                        <div className="p-grid p-fluid">
                            <div className="p-col-12 p-md-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                                <h6><b>Address:</b></h6>
                                <InputText placeholder="Address" value={this.state.address} onChange={event => this.setState({ address: event.target.value })} />
                            </div>
                        </div>

                        <div className="p-grid p-fluid">
                            <div className="p-col-12 p-md-6" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                                <h6><b>Phone Number:</b></h6>
                                <InputText placeholder="Phone Number" value={this.state.phone} onChange={event => this.setState({ phone: event.target.value })} />
                            </div>
                            <div className="p-col-12 p-md-6" style={{ paddingLeft: '5%',paddingRight: '5%', marginTop: '2%' }}>
                                <h6><b>Birthday:</b></h6>
                                <InputMask mask="9999-99-99" placeholder="YYYY-MM-DD" value={this.state.birthday} onChange={event => this.setState({ birthday: event.target.value })} />
                            </div>
                        </div>

                        <div className="p-grid p-fluid">
                            <div className="p-field p-col"> </div>
                            <div className="p-field p-col"> </div>
                            <div className="p-field p-col" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}> <Button label="REGISTER" className="p-button-md p-shadow-5" onClick={this.submitData}> </Button> </div>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}

export default Register;