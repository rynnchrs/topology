import React, { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { Checkbox } from 'primereact/checkbox';
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
    const [viewUsers, setViewUsers] = useState(false);
    const [addUsers, setAddUsers] = useState(false);
    const [editUsers, setEditUsers] = useState(false);
    const [delUsers, setDelUsers] = useState(false);
    const [viewInventory, setViewInventory] = useState(false);
    const [addInventory, setAddInventory] = useState(false);
    const [editInventory, setEditInventory] = useState(false);
    const [delInventory, setDelInventory] = useState(false);
    const [viewInspectionReport, setViewInspectionReport] = useState(false);
    const [addInspectionReport, setAddInspectionReport] = useState(false);
    const [editInspectionReport, setEditInspectionReport] = useState(false);
    const [viewAllInspectionReport, setViewAllInspectionReport] = useState(false);
    const [viewRepairReport, setViewRepairReport] = useState(false);
    const [addRepairReport, setAddRepairReport] = useState(false);
    const [editRepairReport, setEditRepairReport] = useState(false);
    const [delRepairReport, setDelRepairReport] = useState(false);
    const [viewTask, setViewTask] = useState(false);
    const [addTask, setAddTask] = useState(false);
    const [editTask, setEditTask] = useState(false);
    const [delTask, setDelTask] = useState(false);
    const [userLevel, setUserLevel] = useState("");
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
                    if (err.response.data.username) {
                        toast.current.show({ severity: 'error', summary: 'Username', detail: `${err.response.data.username.join()}`, life: 5000 });
                    } else if (err.response.data.email) {
                        toast.current.show({ severity: 'error', summary: 'Email', detail: `${err.response.data.email.join()}`, life: 5000 });
                    } else if (err.response.data.password) {
                        toast.current.show({ severity: 'error', summary: 'Password', detail: `${err.response.data.password.join()}`, life: 5000 });
                    } else if (err.response.data.phone) {
                        toast.current.show({ severity: 'error', summary: 'Phone', detail: `${err.response.data.phone.join()}`, life: 5000 });
                    } else if (err.response.data.user_info.birthday) {
                        //toast.current.show({ severity: 'error', summary: 'Birthday', detail: "Invalid Birthday", life: 3000 });
                        toast.current.show({ severity: 'error', summary: 'Birthday', detail: `${err.response.data.user_info.birthday.join()}`, life: 5000 });
                    }
                });
        }
    }

    const setPermissionLevel = (value) => {
        if (value === "manager") {
            setUserLevel("manager");
            setViewUsers(true);
            setAddUsers(true);
            setEditUsers(true);
            setDelUsers(true);
            setViewInventory(true);
            setAddInventory(true);
            setEditInventory(true);
            setDelInventory(true);
            setViewInspectionReport(true);
            setAddInspectionReport(true);
            setEditInspectionReport(true);
            setViewAllInspectionReport(true);
            setViewRepairReport(true);
            setAddRepairReport(true);
            setEditRepairReport(true);
            setDelRepairReport(true);
            setViewTask(true);
            setAddTask(true);
            setEditTask(true);
            setDelTask(true);
        } else if (value === "technician") {
            setUserLevel("technician");
            setViewUsers(false);
            setAddUsers(false);
            setEditUsers(false);
            setDelUsers(false);

            setViewInventory(true);
            setAddInventory(true);
            setEditInventory(true);
            setDelInventory(true);

            setViewInspectionReport(true);
            setAddInspectionReport(true);
            setEditInspectionReport(true);
            setViewAllInspectionReport(true);

            setViewRepairReport(true);
            setAddRepairReport(true);
            setEditRepairReport(true);
            setDelRepairReport(true);
            setViewTask(false);
            setAddTask(false);
            setEditTask(false);
            setDelTask(false);
            
        } else if (value === "driver") {
            setUserLevel("driver");
            setViewUsers(false);
            setAddUsers(false);
            setEditUsers(false);
            setDelUsers(false);
            
            setViewInventory(false);
            setAddInventory(false);
            setEditInventory(false);
            setDelInventory(false);

            setViewInspectionReport(true);
            setAddInspectionReport(true);
            setEditInspectionReport(false);
            setViewAllInspectionReport(false);

            setViewRepairReport(true);
            setAddRepairReport(true);
            setEditRepairReport(true);
            setDelRepairReport(true);
            setViewTask(true);
            setAddTask(true);
            setEditTask(true);
            setDelTask(true);
           
        } else if (value === "viewer") {
            setUserLevel("viewer");
            setViewUsers(false);
            setAddUsers(false);
            setEditUsers(false);
            setDelUsers(false);
            
            setViewInventory(true);
            setAddInventory(false);
            setEditInventory(false);
            setDelInventory(false);

            setViewInspectionReport(true);
            setAddInspectionReport(false);
            setEditInspectionReport(false);
            setViewAllInspectionReport(true);

            setViewRepairReport(true);
            setAddRepairReport(true);
            setEditRepairReport(true);
            setDelRepairReport(true);
            setViewTask(true);
            setAddTask(true);
            setEditTask(true);
            setDelTask(true);
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
            "can_view_users": viewUsers,
            "can_add_users": addUsers,
            "can_edit_users": editUsers,
            "can_delete_users": delUsers,
            "can_view_inventory": viewInventory,
            "can_add_inventory": addInventory,
            "can_edit_inventory": editInventory,
            "can_delete_inventory": delInventory,
            "can_view_inspection_reports": viewInspectionReport,
            "can_add_inspection_reports": addInspectionReport,
            "can_edit_inspection_reports": editInspectionReport,
            "can_show_all_inspection_reports": viewAllInspectionReport,
            "can_view_repair_reports": viewRepairReport,
            "can_add_repair_reports": addRepairReport,
            "can_edit_repair_reports": editRepairReport,
            "can_delete_repair_reports": delRepairReport,
            "can_view_task": viewTask,
            "can_add_task": addTask,
            "can_edit_task": editTask,
            "can_delete_task": delTask
        });

        axios
            .post(process.env.REACT_APP_SERVER_NAME + 'careta/permission/', body, config)
            .then((res) => {
                setFirst_Name('');
                setLast_Name('');
                setEmail('');
                setUsername('');
                setPassword('');
                setGender([]);
                setCompany('');
                setPosition('');
                setAddress('');
                setPhone('');
                setBirthday('');
                setUserLevel("");
                window.scrollTo({top: 0, left: 0, behavior:'smooth'});
                toast.current.show({ severity: 'success', summary: 'Successfully Registered', detail: 'Account is ready to use.', life: 5000 });
            })
            .catch((err) => {
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

                    <div className="p-grid p-fluid" style={{ paddingLeft: '4%', paddingRight: '4%', marginTop: '2%' }}>
                        <Panel header="PERMISSION" className="p-col-12 p-md-12"><center>
                            <div className="p-grid p-fluid">
                                <div className="p-col-12 p-lg-3 p-md-3 p-sm-12" style={{ display: 'flex', alignItems:'center', margin: 'auto'}}>
                                    <Checkbox classname="p-checkbox-lg" checked={userLevel === "manager"} onChange={event => setPermissionLevel("manager")}> </Checkbox>
                                    <label style={{ paddingLeft: '2%', fontWeight: 'bold' }}> MANAGER</label>
                                </div>
                                <div className="p-col-12 p-lg-3 p-md-3 p-sm-12" style={{ display: 'flex', alignItems:'center'}}>
                                    <Checkbox classname="p-checkbox-lg" checked={userLevel === "technician"} onChange={event => setPermissionLevel("technician")}> </Checkbox>
                                    <label style={{ paddingLeft: '2%', fontWeight: 'bold' }}> TECHNICIAN</label>
                                </div>
                                <div className="p-col-12 p-lg-3 p-md-3 p-sm-12" style={{ display: 'flex', alignItems:'center'}}>
                                    <Checkbox classname="p-checkbox-lg" checked={userLevel === "driver"} onChange={event => setPermissionLevel("driver")}> </Checkbox>
                                    <label style={{ paddingLeft: '2%', fontWeight: 'bold' }}> DRIVER</label>
                                </div>
                                <div className="p-col-12 p-lg-3 p-md-3 p-sm-12" style={{ display: 'flex', alignItems:'center'}}>
                                    <Checkbox classname="p-checkbox-lg" checked={userLevel === "viewer"} onChange={event => setPermissionLevel("viewer")}> </Checkbox>
                                    <label style={{ paddingLeft: '2%', fontWeight: 'bold' }}> VIEWER</label>
                                </div>
                            </div></center>
                        </Panel>
                    </div>

                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-lg-9 p-md-8"> </div>
                        <div className="p-col-12 p-lg-3 p-md-4" style={{ marginTop: '2%', paddingRight: '2%' }}>
                            <Button label="REGISTER" className="p-button-md p-shadow-4 p-button-rounded" onClick={submitData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

}

export default Register;