import React, { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { Checkbox } from 'primereact/checkbox';
import { Fieldset } from 'primereact/fieldset';
import { Panel } from 'primereact/panel';
import { Toast } from 'primereact/toast';
import axios from "axios";

export const Register = () => {

    const [first_name, setFirst_Name] = useState('');
    const [last_name, setLast_Name] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const genderOptions = [{ name: 'Female', val: 'F' }, { name: 'Male', val: 'M' }];
    const [mygender, setGender] = useState([]);
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');
    const [passwordShown, setPasswordShown] = useState(true);
    const [check1, isCheck1] = useState(false);
    const [check2, isCheck2] = useState(false);
    const [check3, isCheck3] = useState(false);
    const [check4, isCheck4] = useState(false);
    const [check5, isCheck5] = useState(false);
    const [check6, isCheck6] = useState(false);
    const [check7, isCheck7] = useState(false);
    const [check8, isCheck8] = useState(false);
    const [check9, isCheck9] = useState(false);
    const [check10, isCheck10] = useState(false);
    const [check11, isCheck11] = useState(false);
    const [check12, isCheck12] = useState(false);
    const [check13, isCheck13] = useState(false);
    const [check14, isCheck14] = useState(false);
    const [check15, isCheck15] = useState(false);
    const [check16, isCheck16] = useState(false);
    const [check17, isCheck17] = useState(false);
    const [check18, isCheck18] = useState(false);
    const [check19, isCheck19] = useState(false);
    const [check20, isCheck20] = useState(false);
    const [check21, isCheck21] = useState(false);
    const [check22, isCheck22] = useState(false);
    const [check23, isCheck23] = useState(false);
    const [check24, isCheck24] = useState(false);
    const toast = useRef(null);

    const submitData = event => {
        if (first_name === "") {
            toast.current.show({ severity: 'warn', summary: 'Empty Field', detail: 'Firstname is required.', life: 5000 });
        } else if (last_name === "") {
            toast.current.show({ severity: 'warn', summary: 'Empty Field', detail: 'Lastname is required.', life: 5000 });
        } else if (email === "") {
            toast.current.show({ severity: 'warn', summary: 'Empty Field', detail: 'Email is required.', life: 5000 });
        } else if (username === "") {
            toast.current.show({ severity: 'warn', summary: 'Empty Field', detail: 'Username is required.', life: 5000 });
        } else if (password === "") {
            toast.current.show({ severity: 'warn', summary: 'Empty Field', detail: 'Password is required.', life: 5000 });
        } else if (mygender.val === null) {
            toast.current.show({ severity: 'warn', summary: 'No Selected', detail: 'Please select a gender.', life: 5000 });
        } else if (company === "") {
            toast.current.show({ severity: 'warn', summary: 'Empty Field', detail: 'Company is required.', life: 5000 });
        } else if (position === "") {
            toast.current.show({ severity: 'warn', summary: 'Empty Field', detail: 'Position is required.', life: 5000 });
        } else if (address === "") {
            toast.current.show({ severity: 'warn', summary: 'Empty Field', detail: 'Address is required.', life: 5000 });
        } else if (phone === "") {
            toast.current.show({ severity: 'warn', summary: 'Empty Field', detail: 'Phone Number is required.', life: 5000 });
        } else if (birthday === "") {
            toast.current.show({ severity: 'warn', summary: 'Empty Field', detail: 'Birthday is required.', life: 5000 });
        } else {
            let token = localStorage.getItem("token");
            
            const gender = mygender.val;
            const user_info = { company, position, gender, birthday, phone, address };

            const config = {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
            };

            // Request Body
            const body = JSON.stringify({ username, email, first_name, last_name, password, user_info });

            axios
                .post(process.env.REACT_APP_SERVER_NAME + 'careta/register/', body, config)
                .then((res) => {
                    submitPermission();
                })
                .catch((err) => {
                    console.log('err: ');
                    console.log(err.response)
                    if (err.response.data.username) {
                        toast.current.show({ severity: 'error', summary: 'Username', detail: `${err.response.data.username.join()}`, life: 5000 });
                    } else if (err.response.data.email) {
                        toast.current.show({ severity: 'error', summary: 'Email', detail: `${err.response.data.email.join()}`, life: 5000 });
                    } else if (err.response.data.password) {
                        toast.current.show({ severity: 'error', summary: 'Password', detail: `${err.response.data.password.join()}`, life: 5000 });
                    } else if (err.response.data.user_info.birthday) {
                        //toast.current.show({ severity: 'error', summary: 'Birthday', detail: "Invalid Birthday", life: 3000 });
                        toast.current.show({ severity: 'error', summary: 'Birthday', detail: `${err.response.data.user_info.birthday.join()}`, life: 5000 });
                    }
                });
        }
    }

    const submitPermission = event => {
        let token = localStorage.getItem("token");
        
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        };

        // Request Body
        const body = JSON.stringify({
            "user": username,
            "can_view_users": check1,
            "can_add_users": check2,
            "can_edit_users": check3,
            "can_delete_users": check4,
            "can_view_inventory": check5,
            "can_add_inventory": check6,
            "can_edit_inventory": check7,
            "can_delete_inventory": check8,
            "can_view_inspection_reports": check9,
            "can_add_inspection_reports": check10,
            "can_edit_inspection_reports": check11,
            "can_delete_inspection_reports": check12,
            "can_view_maintenance_reports": check13,
            "can_add_maintenance_reports": check14,
            "can_edit_maintenance_reports": check15,
            "can_delete_maintenance_reports": check16,
            "can_view_repair_reports": check17,
            "can_add_repair_reports": check18,
            "can_edit_repair_reports": check19,
            "can_delete_repair_reports": check20,
            "can_view_task": check21,
            "can_add_task": check22,
            "can_edit_task": check23,
            "can_delete_task": check24
        });

        axios
            .post(process.env.REACT_APP_SERVER_NAME + 'careta/permission/', body, config)
            .then((res) => {
                // console.log('succ permission: ');
                // console.log(res.data)
                toast.current.show({ severity: 'success', summary: 'Successfully Registered', detail: 'Account is ready to use.', life: 5000 });
            })
            .catch((err) => {
                console.log('err permission: ');
                console.log(err.response)
                toast.current.show({ severity: 'error', summary: 'Permission Fatal', detail: 'Something went wrong.', life: 5000 });
                    
            });
    }

    const toggleShow = () => {
        setPasswordShown(passwordShown ? false : true);
    }

    return (
        <div className="p-grid p-fluid" >
            <Toast ref={toast} />
            <div className="p-col-12">
                <div className="card card-w-title p-shadow-3">
                    <center><h2 style={{ marginTop: '2%' }}><b>Registration Form</b></h2></center>
                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-md-6" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>FIRSTNAME:</b></h6>
                            <InputText placeholder="First Name" value={first_name} onChange={event => setFirst_Name(event.target.value)} />
                        </div>
                        <div className="p-col-12 p-md-6" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>LASTNAME:</b></h6>
                            <InputText placeholder="Last Name" value={last_name} onChange={event => setLast_Name(event.target.value)} />
                        </div>
                    </div>

                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-md-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>EMAIL:</b></h6>
                            <InputText placeholder="Email" value={email} onChange={event => setEmail(event.target.value)} />
                        </div>
                    </div>

                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-md-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>USERNAME:</b></h6>
                            <InputText placeholder="Username" value={username} onChange={event => setUsername(event.target.value)} />
                        </div>
                    </div>

                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-md-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>PASSWORD:</b></h6>
                            <div className="p-inputgroup">
                                <InputText placeholder="Password" type={passwordShown ? 'password' : 'text'} value={password} onChange={event => setPassword(event.target.value)} />
                                <Button icon={passwordShown ? 'pi pi-eye' : 'pi pi-eye-slash'} onClick={toggleShow}> </Button>
                            </div>
                        </div>
                    </div>

                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-md-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>GENDER:</b></h6>
                            <Dropdown value={mygender} options={genderOptions} optionLabel="name" placeholder="Select Gender" onChange={event => setGender(event.target.value)} />
                        </div>
                    </div>

                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-md-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>COMPANY:</b></h6>
                            <InputText placeholder="Company" value={company} onChange={event => setCompany(event.target.value)} />
                        </div>
                    </div>

                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-md-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>POSITION:</b></h6>
                            <InputText placeholder="Position" value={position} onChange={event => setPosition(event.target.value)} />
                        </div>
                    </div>

                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-md-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>ADDRESS:</b></h6>
                            <InputText placeholder="Address" value={address} onChange={event => setAddress(event.target.value)} />
                        </div>
                    </div>

                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-md-6" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>PHONE NUMBER:</b></h6>
                            <InputText placeholder="Phone Number" value={phone} onChange={event => setPhone(event.target.value)} />
                        </div>
                        <div className="p-col-12 p-md-6" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>BIRTHDAY: </b><i>(e.g. 1990-12-30)</i></h6>
                            <InputMask mask="9999-99-99" placeholder="YYYY-MM-DD" value={birthday} onChange={event => setBirthday(event.target.value)} />
                        </div>
                    </div>

                    <div className="p-grid p-fluid" style={{ paddingLeft: '2%', paddingRight: '2%', marginTop: '2%' }}>
                        <Panel header="PERMISSION" className="p-col-12 p-md-12">
                            <div className="p-grid p-fluid">
                                <div className="p-col-12 p-md-4" style={{ paddingLeft: '2%', paddingRight: '2%' }}>
                                    <Fieldset legend="User Data">
                                        {/*<div className="p-col">
                                            <Checkbox classname="p-checkbox-lg" checked={check1} onChange={event => isCheck1(check1 ? false : true)}> </Checkbox>
                                            <label style={{ paddingLeft: '5%', fontWeight: 'bold' }}> VIEW</label>
                                        </div>*/}
                                        <div className="p-col">
                                            <Checkbox classname="p-checkbox-lg" checked={check2} onChange={event => isCheck2(check2 ? false : true)}> </Checkbox>
                                            <label style={{ paddingLeft: '2%', fontWeight: 'bold' }}> ADD </label>
                                        </div>
                                        <div className="p-col">
                                            <Checkbox classname="p-checkbox-lg" checked={check3} onChange={event => isCheck3(check3 ? false : true)}> </Checkbox>
                                            <label style={{ paddingLeft: '2%', fontWeight: 'bold' }}> EDIT</label>
                                        </div>
                                        <div className="p-col">
                                            <Checkbox classname="p-checkbox-lg" checked={check4} onChange={event => isCheck4(check4 ? false : true)}> </Checkbox>
                                            <label style={{ paddingLeft: '2%', fontWeight: 'bold' }}> DELETE</label>
                                        </div>
                                        <div className="p-col" style={{ height:'45px'}}></div>
                                    </Fieldset>
                                </div>

                                <div className="p-col-12 p-md-4" style={{ paddingLeft: '2%', paddingRight: '2%' }}>
                                    <Fieldset legend="Inventory">
                                        <div className="p-col">
                                            <Checkbox classname="p-checkbox-lg" checked={check5} onChange={event => isCheck5(check5 ? false : true)}> </Checkbox>
                                            <label style={{ paddingLeft: '2%', fontWeight: 'bold' }}> VIEW</label>
                                        </div>
                                        <div className="p-col">
                                            <Checkbox classname="p-checkbox-lg" checked={check6} onChange={event => isCheck6(check6 ? false : true)}> </Checkbox>
                                            <label style={{ paddingLeft: '2%', fontWeight: 'bold' }}> ADD </label>
                                        </div>
                                        <div className="p-col">
                                            <Checkbox classname="p-checkbox-lg" checked={check7} onChange={event => isCheck7(check7 ? false : true)}> </Checkbox>
                                            <label style={{ paddingLeft: '2%', fontWeight: 'bold' }}> EDIT</label>
                                        </div>
                                        <div className="p-col">
                                            <Checkbox classname="p-checkbox-lg" checked={check8} onChange={event => isCheck8(check8 ? false : true)}> </Checkbox>
                                            <label style={{ paddingLeft: '2%', fontWeight: 'bold' }}> DELETE</label>
                                        </div>
                                    </Fieldset>
                                </div>

                                <div className="p-col-12 p-md-4" style={{ paddingLeft: '2%', paddingRight: '2%' }}>
                                    <Fieldset legend="Inspection Report">
                                        <div className="p-col">
                                            <Checkbox classname="p-checkbox-lg" checked={check9} onChange={event => isCheck9(check9 ? false : true)}> </Checkbox>
                                            <label style={{ paddingLeft: '2%', fontWeight: 'bold' }}> VIEW</label>
                                        </div>
                                        <div className="p-col">
                                            <Checkbox classname="p-checkbox-lg" checked={check10} onChange={event => isCheck10(check10 ? false : true)}> </Checkbox>
                                            <label style={{ paddingLeft: '2%', fontWeight: 'bold' }}> ADD </label>
                                        </div>
                                        <div className="p-col">
                                            <Checkbox classname="p-checkbox-lg" checked={check11} onChange={event => isCheck11(check11 ? false : true)}> </Checkbox>
                                            <label style={{ paddingLeft: '2%', fontWeight: 'bold' }}> EDIT</label>
                                        </div>
                                        <div className="p-col">
                                            <Checkbox classname="p-checkbox-lg" checked={check12} onChange={event => isCheck12(check12 ? false : true)}> </Checkbox>
                                            <label style={{ paddingLeft: '2%', fontWeight: 'bold' }}> DELETE</label>
                                        </div>
                                    </Fieldset>
                                </div>
                            </div>

                            <div className="p-grid p-fluid">
                                <div className="p-col-12 p-md-4" style={{ paddingLeft: '2%', paddingRight: '2%' }}>
                                    <Fieldset legend="Maintenance Report">
                                        <div className="p-col">
                                            <Checkbox classname="p-checkbox-lg" checked={check13} onChange={event => isCheck13(check13 ? false : true)}> </Checkbox>
                                            <label style={{ paddingLeft: '2%', fontWeight: 'bold' }}> VIEW</label>
                                        </div>
                                        <div className="p-col">
                                            <Checkbox classname="p-checkbox-lg" checked={check14} onChange={event => isCheck14(check14 ? false : true)}> </Checkbox>
                                            <label style={{ paddingLeft: '2%', fontWeight: 'bold' }}> ADD </label>
                                        </div>
                                        <div className="p-col">
                                            <Checkbox classname="p-checkbox-lg" checked={check15} onChange={event => isCheck15(check15 ? false : true)}> </Checkbox>
                                            <label style={{ paddingLeft: '2%', fontWeight: 'bold' }}> EDIT</label>
                                        </div>
                                        <div className="p-col">
                                            <Checkbox classname="p-checkbox-lg" checked={check16} onChange={event => isCheck16(check16 ? false : true)}> </Checkbox>
                                            <label style={{ paddingLeft: '2%', fontWeight: 'bold' }}> DELETE</label>
                                        </div>
                                    </Fieldset>
                                </div>

                                <div className="p-col-12 p-md-4" style={{ paddingLeft: '2%', paddingRight: '2%' }}>
                                    <Fieldset legend="Repair Reports">
                                        <div className="p-col">
                                            <Checkbox classname="p-checkbox-lg" checked={check17} onChange={event => isCheck17(check17 ? false : true)}> </Checkbox>
                                            <label style={{ paddingLeft: '2%', fontWeight: 'bold' }}> VIEW</label>
                                        </div>
                                        <div className="p-col">
                                            <Checkbox classname="p-checkbox-lg" checked={check18} onChange={event => isCheck18(check18 ? false : true)}> </Checkbox>
                                            <label style={{ paddingLeft: '2%', fontWeight: 'bold' }}> ADD </label>
                                        </div>
                                        <div className="p-col">
                                            <Checkbox classname="p-checkbox-lg" checked={check19} onChange={event => isCheck19(check19 ? false : true)}> </Checkbox>
                                            <label style={{ paddingLeft: '2%', fontWeight: 'bold' }}> EDIT</label>
                                        </div>
                                        <div className="p-col">
                                            <Checkbox classname="p-checkbox-lg" checked={check20} onChange={event => isCheck20(check20 ? false : true)}> </Checkbox>
                                            <label style={{ paddingLeft: '2%', fontWeight: 'bold' }}> DELETE</label>
                                        </div>
                                    </Fieldset>
                                </div>

                                <div className="p-col-12 p-md-4" style={{ paddingLeft: '2%', paddingRight: '2%' }}>
                                    <Fieldset legend="Task">
                                        <div className="p-col">
                                            <Checkbox classname="p-checkbox-lg" checked={check21} onChange={event => isCheck21(check21 ? false : true)}> </Checkbox>
                                            <label style={{ paddingLeft: '2%', fontWeight: 'bold' }}> VIEW</label>
                                        </div>
                                        <div className="p-col">
                                            <Checkbox classname="p-checkbox-lg" checked={check22} onChange={event => isCheck22(check22 ? false : true)}> </Checkbox>
                                            <label style={{ paddingLeft: '2%', fontWeight: 'bold' }}> ADD </label>
                                        </div>
                                        <div className="p-col">
                                            <Checkbox classname="p-checkbox-lg" checked={check23} onChange={event => isCheck23(check23 ? false : true)}> </Checkbox>
                                            <label style={{ paddingLeft: '2%', fontWeight: 'bold' }}> EDIT</label>
                                        </div>
                                        <div className="p-col">
                                            <Checkbox classname="p-checkbox-lg" checked={check24} onChange={event => isCheck24(check24 ? false : true)}> </Checkbox>
                                            <label style={{ paddingLeft: '2%', fontWeight: 'bold' }}> DELETE</label>
                                        </div>
                                    </Fieldset>
                                </div>
                            </div>
                        </Panel>
                    </div>

                    <div className="p-grid p-fluid">
                        <div className="p-field p-col"> </div>
                        <div className="p-field p-col"> </div>
                        <div className="p-field p-col" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <Button label="REGISTER" className="p-button-md p-shadow-4 p-button-rounded" onClick={submitData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

}

export default Register;