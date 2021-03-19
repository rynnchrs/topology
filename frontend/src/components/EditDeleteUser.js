import React, { useRef, useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { Checkbox } from 'primereact/checkbox';
import { Fieldset } from 'primereact/fieldset';
import { Panel } from 'primereact/panel';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import axios from "axios";

import {
    SERVER_NAME
} from '../environment.js';

export const EditDeleteUser = () => {
    
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [word, setWord] = useState('');

    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayBasic2, setDisplayBasic2] = useState(false);
    const [isChanged, setIsChanged] = useState(false);

    const [first_name, setFirst_Name] = useState('');
    const [last_name, setLast_Name] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //const password = 'qwerty12345()';
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

    const [globalFilter, setGlobalFilter] = useState(null);
    const dt = useRef(null);

    useEffect(() => {
        getUsers();
        //console.log(users)
    }, []); 

    const toggleShow = () => {
        setPasswordShown(passwordShown ? false : true);
    }

    const getUsers = () => {
        let token = localStorage.getItem("token");

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios
            .get(SERVER_NAME + 'api/users/', config)
            .then((res) => {
                //console.log("users:");
                //console.log(res.data);
                //console.log(res.data.username);
                //console.log(res.data.length);
                setUsers(res.data);
            })
            .catch((err) => {
                console.log("getusers err:");
                console.log(err.response);
            });
    }

    const saveChanges = () => {
        if (first_name === "") {
            toast.current.show({ severity: 'warn', summary: 'Empty Field', detail: 'Firstname is required.', life: 3000 });
        } else if (last_name === "") {
            toast.current.show({ severity: 'warn', summary: 'Empty Field', detail: 'Lastname is required.', life: 3000 });
        } else if (email === "") {
            toast.current.show({ severity: 'warn', summary: 'Empty Field', detail: 'Email is required.', life: 3000 });
        } else if (username === "") {
            toast.current.show({ severity: 'warn', summary: 'Empty Field', detail: 'Username is required.', life: 3000 });
        } else if (mygender.val === null) {
            toast.current.show({ severity: 'warn', summary: 'No Selected', detail: 'Please select a gender.', life: 3000 });
        } else if (company === "") {
            toast.current.show({ severity: 'warn', summary: 'Empty Field', detail: 'Company is required.', life: 3000 });
        } else if (position === "") {
            toast.current.show({ severity: 'warn', summary: 'Empty Field', detail: 'Position is required.', life: 3000 });
        } else if (address === "") {
            toast.current.show({ severity: 'warn', summary: 'Empty Field', detail: 'Address is required.', life: 3000 });
        } else if (phone === "") {
            toast.current.show({ severity: 'warn', summary: 'Empty Field', detail: 'Phone Number is required.', life: 3000 });
        } else if (birthday === "") {
            toast.current.show({ severity: 'warn', summary: 'Empty Field', detail: 'Birthday is required.', life: 3000 });
        } else {
            let token = localStorage.getItem("token");
            let usernames = selectedUser.username;

            const gender = mygender.val;
            const user_info = { company, position, gender, birthday, phone, address };

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            };

            let body = "";
            if (password === "") {
                body = JSON.stringify({ username, email, first_name, last_name, user_info });
                //console.log('body no pass: ' + body);
            } else {
                body = JSON.stringify({ username, email, first_name, last_name, password, user_info });
                //console.log('body w/ pass: ' + body);
            }
                
            axios
                .put(SERVER_NAME + 'api/users/' + usernames + '/', body, config)
                .then((res) => {
                    //console.log("save changes:");
                    //console.log(res.data);
                    updatePermissionUser();
                })
                .catch((err) => {
                    console.log("save changes err:");
                    console.log(err.response);
                    if (err.response.data.username) {
                        toast.current.show({ severity: 'error', summary: 'Username', detail: `${err.response.data.username.join()}`, life: 3000 });
                    } else if (err.response.data.email) {
                        toast.current.show({ severity: 'error', summary: 'Email', detail: `${err.response.data.email.join()}`, life: 3000 });
                    } else if (err.response.data.password) {
                        toast.current.show({ severity: 'error', summary: 'Password', detail: `${err.response.data.password.join()}`, life: 3000 });
                    } else if (err.response.data.user_info.birthday) {
                        //toast.current.show({ severity: 'error', summary: 'Birthday', detail: "Invalid Birthday", life: 3000 });
                        toast.current.show({ severity: 'error', summary: 'Birthday', detail: `${err.response.data.user_info.birthday.join()}`, life: 3000 });
                    }
                });
        }
    }

    const getPermission = () => {
        let token = localStorage.getItem("token");
        let username = selectedUser.username;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios
            .get(SERVER_NAME + 'api/permission/' + username + '/', config)
            .then((res) => {
                isCheck1(res.data.can_view_users);
                isCheck2(res.data.can_add_users);
                isCheck3(res.data.can_edit_users);
                isCheck4(res.data.can_delete_users);
                isCheck5(res.data.can_view_inventory);
                isCheck6(res.data.can_add_inventory);
                isCheck7(res.data.can_edit_inventory);
                isCheck8(res.data.can_delete_inventory);
                isCheck9(res.data.can_view_inspection_reports);
                isCheck10(res.data.can_add_inspection_reports);
                isCheck11(res.data.can_edit_inspection_reports);
                isCheck12(res.data.can_delete_inspection_reports);
                isCheck13(res.data.can_view_maintenance_reports);
                isCheck14(res.data.can_add_maintenance_reports);
                isCheck15(res.data.can_edit_maintenance_reports);
                isCheck16(res.data.can_delete_maintenance_reports);
                isCheck17(res.data.can_view_repair_reports);
                isCheck18(res.data.can_add_repair_reports);
                isCheck19(res.data.can_edit_repair_reports);
                isCheck20(res.data.can_delete_repair_reports);
                isCheck21(res.data.can_view_task);
                isCheck22(res.data.can_add_task);
                isCheck23(res.data.can_edit_task);
                isCheck24(res.data.can_delete_task);
            })
            .catch((err) => {
                console.log("permission err:");
                console.log(err.response);
            });
    }

    const updateLocalPermission = () => {
        let token = localStorage.getItem("token");
        let user = localStorage.getItem("username");
        let username = selectedUser.username;
        if(user !== username){
            console.log("not username")
        } else {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            };
    
            axios
                .get(SERVER_NAME + 'api/permission/' + username + '/', config)
                .then((res) => {
                    res.data.can_view_users ? localStorage.setItem('viewUsers', "true") : localStorage.setItem('viewUsers', "false")
                    res.data.can_add_users ? localStorage.setItem('addUsers', "true") : localStorage.setItem('addUsers', "false")
                    res.data.can_edit_users ? localStorage.setItem('editUsers', "true") : localStorage.setItem('editUsers', "false")
                    res.data.can_delete_users ? localStorage.setItem('deleteUsers', "true") : localStorage.setItem('deleteUsers', "false")
                    
                    res.data.can_view_inventory ? localStorage.setItem('viewInventory', "true") : localStorage.setItem('viewInventory', "false")
                    res.data.can_add_inventory ? localStorage.setItem('addInventory', "true") : localStorage.setItem('addInventory', "false")
                    res.data.can_edit_inventory ? localStorage.setItem('editInventory', "true") : localStorage.setItem('editInventory', "false")
                    res.data.can_delete_inventory ? localStorage.setItem('deleteInventory', "true") : localStorage.setItem('deleteInventory', "false")
    
                    res.data.can_view_inspection_reports ? localStorage.setItem('viewInspectionReport', "true") : localStorage.setItem('viewInspectionReport', "false")
                    res.data.can_add_inspection_reports ? localStorage.setItem('addInspectionReport', "true") : localStorage.setItem('addInspectionReport', "false")
                    res.data.can_edit_inspection_reports ? localStorage.setItem('editInspectionReport', "true") : localStorage.setItem('editInspectionReport', "false")
                    res.data.can_delete_inspection_reports ? localStorage.setItem('deleteInspectionReport', "true") : localStorage.setItem('deleteInspectionReport', "false")
                    
                    res.data.can_view_maintenance_reports ? localStorage.setItem('viewMaintenanceReport', "true") : localStorage.setItem('viewMaintenanceReport', "false")
                    res.data.can_add_maintenance_reports ? localStorage.setItem('addMaintenanceReport', "true") : localStorage.setItem('addMaintenanceReport', "false")
                    res.data.can_edit_maintenance_reports ? localStorage.setItem('editMaintenanceReport', "true") : localStorage.setItem('editMaintenanceReport', "false")
                    res.data.can_delete_maintenance_reports ? localStorage.setItem('deleteMaintenanceReport', "true") : localStorage.setItem('deleteMaintenanceReport', "false")
    
                    res.data.can_view_repair_reports ? localStorage.setItem('viewRepairReport', "true") : localStorage.setItem('viewRepairReport', "false")
                    res.data.can_add_repair_reports ? localStorage.setItem('addRepairReport', "true") : localStorage.setItem('addRepairReport', "false")
                    res.data.can_edit_repair_reports ? localStorage.setItem('editRepairReport', "true") : localStorage.setItem('editRepairReport', "false")
                    res.data.can_delete_repair_reports ? localStorage.setItem('deleteRepairReport', "true") : localStorage.setItem('deleteRepairReport', "false")
    
                    res.data.can_view_task ? localStorage.setItem('viewTask', "true") : localStorage.setItem('viewTask', "false")
                    res.data.can_add_task ? localStorage.setItem('addTask', "true") : localStorage.setItem('addTask', "false")
                    res.data.can_edit_task ? localStorage.setItem('editTask', "true") : localStorage.setItem('editTask', "false")
                    res.data.can_delete_task ? localStorage.setItem('deleteTask', "true") : localStorage.setItem('deleteTask', "false")
                    setIsChanged(true);
                })
                .catch((err) => {
                    console.log("local permission err:");
                    console.log(err.response);
                });
        }
    }

    const updatePermissionUser = event => {
        let token = localStorage.getItem("token");
        //let username = selectedUser.username;
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
            "can_delete_users": check4
        });
        //console.log('body: ' + body);
        axios
            .put(SERVER_NAME + 'api/permission/user/' + username + '/', body, config)
            .then((res) => {
                //console.log('succ permission user: ');
                //console.log(res.data)
                updatePermissionInventory();
            })
            .catch((err) => {
                console.log('err permission user: ');
                console.log(err.response)
                toast.current.show({ severity: 'error', summary: 'Permission Fatal User', detail: 'Something went wrong.', life: 3000 });
            });
    }

    const updatePermissionInventory = event => {
        let token = localStorage.getItem("token");
        //let username = selectedUser.username;

        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        };

        // Request Body
        const body = JSON.stringify({
            "user": username,
            "can_view_inventory": check5,
            "can_add_inventory": check6,
            "can_edit_inventory": check7,
            "can_delete_inventory": check8
        });
        //console.log('body: ' + body);
        axios
            .put(SERVER_NAME + 'api/permission/inventory/' + username + '/', body, config)
            .then((res) => {
                //console.log('succ permission inventory: ');
                //console.log(res.data)
                updatePermissionInspectionReport();
            })
            .catch((err) => {
                console.log('err permission inventory: ');
                console.log(err.response)
                toast.current.show({ severity: 'error', summary: 'Permission Fatal Inventory', detail: 'Something went wrong.', life: 3000 });
            });
    }

    const updatePermissionInspectionReport = event => {
        let token = localStorage.getItem("token");
        //let username = selectedUser.username;

        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        };

        // Request Body
        const body = JSON.stringify({
            "user": username,
            "can_view_inspection_reports": check9,
            "can_add_inspection_reports": check10,
            "can_edit_inspection_reports": check11,
            "can_delete_inspection_reports": check12
        });
        //console.log('body: ' + body);
        axios
            .put(SERVER_NAME + 'api/permission/inspection-report/' + username + '/', body, config)
            .then((res) => {
                //console.log('succ permission inspect: ');
                //console.log(res.data)
                updatePermissionMaintenanceReport();
            })
            .catch((err) => {
                console.log('err permission inspect: ');
                console.log(err.response)
                toast.current.show({ severity: 'error', summary: 'Permission Fatal Inspection Report', detail: 'Something went wrong.', life: 3000 });
            });
    }

    const updatePermissionMaintenanceReport = event => {
        let token = localStorage.getItem("token");
        //let username = selectedUser.username;

        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        };

        // Request Body
        const body = JSON.stringify({
            "user": username,
            "can_view_maintenance_reports": check13,
            "can_add_maintenance_reports": check14,
            "can_edit_maintenance_reports": check15,
            "can_delete_maintenance_reports": check16
        });
        //console.log('body: ' + body);
        axios
            .put(SERVER_NAME + 'api/permission/maintenance-report/' + username + '/', body, config)
            .then((res) => {
                //console.log('succ permission maintenance: ');
                //console.log(res.data)
                updatePermissionRepairReport();
            })
            .catch((err) => {
                console.log('err permission maintenance: ');
                console.log(err.response)
                toast.current.show({ severity: 'error', summary: 'Permission Fatal Maintenance Report', detail: 'Something went wrong.', life: 3000 });
            });
    }

    const updatePermissionRepairReport = event => {
        let token = localStorage.getItem("token");
        //let username = selectedUser.username;

        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        };

        // Request Body
        const body = JSON.stringify({
            "user": username,
            "can_view_repair_reports": check17,
            "can_add_repair_reports": check18,
            "can_edit_repair_reports": check19,
            "can_delete_repair_reports": check20
        });
        //console.log('body: ' + body);
        axios
            .put(SERVER_NAME + 'api/permission/repair-report/' + username + '/', body, config)
            .then((res) => {
                //console.log('succ permission repair: ');
                //console.log(res.data)
                updatePermissionTask();
            })
            .catch((err) => {
                console.log('err permission repair: ');
                console.log(err.response)
                toast.current.show({ severity: 'error', summary: 'Permission Fatal Repair Report', detail: 'Something went wrong.', life: 3000 });
            });
    }

    const updatePermissionTask = event => {
        let token = localStorage.getItem("token");
        //let username = selectedUser.username;

        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        };

        // Request Body
        const body = JSON.stringify({
            "user": username,
            "can_view_task": check21,
            "can_add_task": check22,
            "can_edit_task": check23,
            "can_delete_task": check24
        });
        //console.log('body: ' + body);
        axios
            .put(SERVER_NAME + 'api/permission/task/' + username + '/', body, config)
            .then((res) => {
                //console.log('succ permission task: ');
                //console.log(res.data)
                toast.current.show({ severity: 'success', summary: 'Save Successfully', detail: 'User details updated.', life: 3000 });
                getUsers();
                updateLocalPermission();
                //setIsChanged(true);
                //refreshPage()

            })
            .catch((err) => {
                console.log('err permission task: ');
                console.log(err.response)
                toast.current.show({ severity: 'error', summary: 'Permission Fatal Repair Report', detail: 'Something went wrong.', life: 3000 });
            });
    }

    function refreshPage() {
        window.location.reload();
    }

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
        'displayBasic2': setDisplayBasic2
    }

    const onClick = (name) => {
        //console.log(selectedUser.username)
        if (selectedUser != null) {
            dialogFuncMap[`${name}`](true);
            getPermission();
            let myData = users.find(x => x.username === selectedUser.username);
            setFirst_Name(myData.first_name);
            setLast_Name(myData.last_name);
            setEmail(myData.email);
            setUsername(myData.username);
            setGender(genderOptions.find(x => x.val === myData.user_info.gender));
            setCompany(myData.user_info.company);
            setPosition(myData.user_info.position);
            setAddress(myData.user_info.address);
            setPhone(myData.user_info.phone);
            setBirthday(myData.user_info.birthday);
        } else {
            toast.current.show({ severity: 'error', summary: 'No Selected', detail: 'Please select a row in table first to edit.', life: 5000 });
        }
    }

    const confirmDelete = (name) => {
        if (selectedUser != null) {
            setWord(selectedUser.username);
            dialogFuncMap[`${name}`](true);
        } else {
            toast.current.show({ severity: 'error', summary: 'No Selected', detail: 'Please select a row in table first to delete.', life: 5000 });
        }
    }

    const deleteUser = event => {
        let token = localStorage.getItem("token");
        let username = selectedUser.username;

        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        };

        axios
            .delete(SERVER_NAME + 'api/users/' + username + '/', config)
            .then((res) => {
                //console.log('succ delete user: ');
                //console.log(res.data)
                toast.current.show({ severity: 'success', summary: 'Delete Successfully', detail: 'User deleted.', life: 5000 });
                getUsers();
                //deletePermission();
            })
            .catch((err) => {
                console.log('err delete user: ');
                console.log(err.response)
                toast.current.show({ severity: 'error', summary: 'Delete User Error', detail: 'Something went wrong.', life: 5000 });
            });
    }

    // const deletePermission = event => {
    //     let token = localStorage.getItem("token");
    //     let username = selectedUser.username;

    //     const config = {
    //         headers: {
    //             'Authorization': 'Bearer ' + token,
    //             'Content-Type': 'application/json',
    //         },
    //     };

    //     axios
    //         .delete('http://127.0.0.1:8000/api/permission/' + username + '/', config)
    //         .then((res) => {
    //             console.log('succ delete permission: ');
    //             console.log(res.data)
    //             toast.current.show({ severity: 'success', summary: 'Delete Successfully', detail: 'User deleted.', life: 5000 });
    //             getUsers();
    //         })
    //         .catch((err) => {
    //             console.log('err delete permission: ');
    //             console.log(err.response)
    //             toast.current.show({ severity: 'error', summary: 'Delete Permission Error', detail: 'Something went wrong.', life: 5000 });
    //         });
    // }


    const renderFooter = (name) => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" className="p-button-danger" onClick={() => onHideDelete(name)} autoFocus />
            </div>
        );
    }

    const actionBody = () => {
        return (
            localStorage.getItem("deleteUsers") === "true" ? <center>
            <Button icon="pi pi-times" className="p-button-rounded p-button-danger" onClick={() => confirmDelete('displayBasic2')}/> </center>
            : <center>
            <Button icon="pi pi-times" className="p-button-rounded p-button-danger" onClick={() => confirmDelete('displayBasic2')} disabled/> </center>
        );
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
        if (isChanged) {
            refreshPage();
            setIsChanged(false);
            } else {
               console.log("nothing change")
            }
    }

    const onHideDelete = (name) => {
        deleteUser();
        dialogFuncMap[`${name}`](false);
    }

    return (
        <div className="p-grid p-fluid" >
            <Toast ref={toast} />
            <div className="p-col-12">
                <div className="p-fluid p-grid">
                <div className="p-col-12 p-lg-2 p-md-2 p-sm-3">
                    { localStorage.getItem("editUsers") === "true" ?
                        <Button label="Edit" icon="pi pi-pencil" className="p-mr-2" onClick={() => onClick('displayBasic')} />
                        :
                        <Button label="Edit" icon="pi pi-pencil" className="p-mr-2" onClick={() => onClick('displayBasic')} disabled/> }
                        </div>
                        <div className="p-col-12 p-md-6">

                        </div>
                    <div className="p-col-12 p-lg-4 p-md-4 p-sm-4">
                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search Users" />
                        </span>
                    </div>
                </div>
            </div>

            <div className="p-col-12">
                <Panel header="USER MANAGEMENT">
                    <DataTable ref={dt} value={users} className="p-datatable-sm" resizableColumns columnResizeMode="expand"
                        globalFilter={globalFilter} selectionMode="single" selection={selectedUser} onSelectionChange={e => setSelectedUser(e.value)}
                        paginator rows={10} emptyMessage="No users found.">
                        <Column field="user_info.full_name" header="Name" style={{ paddingLeft: '2%' }}></Column>
                        {/* <Column field="name" header="Name"></Column> */}
                        {/* <Column field="email" header="Email"></Column> */}
                        <Column body={actionBody} header="Action (Delete)" style={{ textAlign: 'center' }}></Column>
                    </DataTable>
                </Panel>
            </div>



            <Dialog header="Edit Form" visible={displayBasic} style={{  width: '85vw' }} onHide={() => onHide('displayBasic')}>
                <div className="p-col-12">
                    
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
                                    {/*<Button icon="pi pi-eye" onClick={toggleShow}> </Button>*/}
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
                                <h6><b>BIRTHDAY:</b></h6>
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
                                                <label style={{ paddingLeft: '2%', fontWeight: 'bold' }}> VIEW</label>
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
                            <Button label="SAVE CHANGES" className="p-button-md p-shadow-6 p-button-rounded" onClick={saveChanges} />
                            </div>
                        </div>


                    
                </div>
            </Dialog>

            <Dialog header="Confirm Delete" visible={displayBasic2} style={{ width: '40vw' }} footer={renderFooter('displayBasic2')} onHide={() => onHide('displayBasic2')}>
                Are you sure to delete this record of
                <label style={{ fontWeight: 'bold' }}> {word} </label>
                ?
            </Dialog>
            
        </div>

    )


}

export default EditDeleteUser;
