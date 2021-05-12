import React, { useRef, useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { Checkbox } from 'primereact/checkbox';
import { Panel } from 'primereact/panel';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Paginator } from 'primereact/paginator';
import axios from "axios";

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
    const [viewMaintenanceReport, setViewMaintenanceReport] = useState(false);
    const [addMaintenanceReport, setAddMaintenanceReport] = useState(false);
    const [editMaintenanceReport, setEditMaintenanceReport] = useState(false);
    const [delMaintenanceReport, setDelMaintenanceReport] = useState(false);
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

    const dt = useRef(null);

    const [first, setFirst] = useState(0);
    const rows = 10;
    const [flagPages, setFlagPages] = useState(1);
    const [totalCount, setTotalCount] = useState(15);
    const [seacrhUser, setSearchUser] = useState("");

    //for pagination
    useEffect(() => {
        try {
            const sentPage = (first / rows) + 1;

            let token = localStorage.getItem("token");
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            };

            axios
                .get(process.env.REACT_APP_SERVER_NAME + 'careta/user-list/?search=' + seacrhUser + '&page=' + sentPage, config)
                .then((res) => {
                    setTotalCount(res.data.count);
                    setUsers(res.data.results);
                })
                .catch((err) => {
                    
                });
        } catch(err) {

        }
    }, [flagPages]); // eslint-disable-line react-hooks/exhaustive-deps

    //for pagination
    const onPageChange = (event) =>  {
        setFirst(event.first);
        if (event.first > first) {
            setFlagPages(flagPages + 1);
        } else if (event.first < first) {
            setFlagPages(flagPages - 1);
        } else {

        }          
    }

    const getUsers = () => {
        const sentPage = (first / rows) + 1;
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios
            .get(process.env.REACT_APP_SERVER_NAME + 'careta/user-list/?search=' + seacrhUser + '&page=' + sentPage, config)
            .then((res) => {
                setTotalCount(res.data.count);
                setUsers(res.data.results);
            })
            .catch((err) => {
                console.log(err.response);
                if(err.response.data.detail === "Invalid page."){
                    errorGet();
                }
            });
    }

    const errorGet = () => {
        const sentPage = (first / rows);
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios
            .get(process.env.REACT_APP_SERVER_NAME + 'careta/user-list/?search=' + seacrhUser + '&page=' + sentPage, config)
            .then((res) => {
                setTotalCount(res.data.count);
                setUsers(res.data.results);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }

    const [timeOutId, setTimeOutId] = useState(null);
    const filterUser = (event) => {
        setSearchUser(event.target.value);
        clearTimeout(timeOutId);
        setTimeOutId(setTimeout(() => {
            let token = localStorage.getItem("token");
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            };

            axios
                .get(process.env.REACT_APP_SERVER_NAME + 'careta/user-list/?search=' + event.target.value, config)
                .then((res) => {
                    console.log("paginF:", res.data);
                    setTotalCount(res.data.count);
                    setUsers(res.data.results);
                })
                .catch((err) => {
                    console.log("getusersflag err:");
                    console.log(err.response);
                });
        }, 1000));
    }

    const toggleShow = () => {
        setPasswordShown(passwordShown ? false : true);
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
            } else {
                body = JSON.stringify({ username, email, first_name, last_name, password, user_info });
            }
                
            axios
                .put(process.env.REACT_APP_SERVER_NAME + 'careta/users/' + usernames + '/', body, config)
                .then((res) => {
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
                    } else if (err.response.data.phone) {
                        toast.current.show({ severity: 'error', summary: 'Phone', detail: `${err.response.data.phone.join()}`, life: 5000 });
                    } else if (err.response.data.user_info.birthday) {
                        //toast.current.show({ severity: 'error', summary: 'Birthday', detail: "Invalid Birthday", life: 3000 });
                        toast.current.show({ severity: 'error', summary: 'Birthday', detail: `${err.response.data.user_info.birthday.join()}`, life: 3000 });
                    }
                });
        }
    }

    const getUserData = () => {
        if (selectedUser != null) {
            let token = localStorage.getItem("token");
            let username = selectedUser.username;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            };

            axios
                .get(process.env.REACT_APP_SERVER_NAME + 'careta/users/' + username + '/', config)
                .then((res) => {
                    setFirst_Name(res.data.first_name);
                    setLast_Name(res.data.last_name);
                    setEmail(res.data.email);
                    setUsername(res.data.username);
                    try{
                        setGender(genderOptions.find(x => x.val === res.data.user_info.gender));
                    } catch(err){
                        console.log("err gender: ", err)
                    }
                    setCompany(res.data.user_info.company);
                    setPosition(res.data.user_info.position);
                    setAddress(res.data.user_info.address);
                    setPhone(res.data.user_info.phone);
                    setBirthday(res.data.user_info.birthday);
                    getPermission();
                })
                .catch((err) => {
                    console.log("userdata err:");
                    console.log(err.response);
                });
        } else {
            toast.current.show({ severity: 'error', summary: 'No Selected', detail: 'Please select a row in table first to edit.', life: 5000 });
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
            .get(process.env.REACT_APP_SERVER_NAME + 'careta/permission/' + username + '/', config)
            .then((res) => {
                setViewUsers(res.data.can_view_users);
                setAddUsers(res.data.can_add_users);
                setEditUsers(res.data.can_edit_users);
                setDelUsers(res.data.can_delete_users);
                setViewInventory(res.data.can_view_inventory);
                setAddInventory(res.data.can_add_inventory);
                setEditInventory(res.data.can_edit_inventory);
                setDelInventory(res.data.can_delete_inventory);
                setViewInspectionReport(res.data.can_view_inspection_reports);
                setAddInspectionReport(res.data.can_add_inspection_reports);
                setEditInspectionReport(res.data.can_edit_inspection_reports);
                setViewAllInspectionReport(res.data.can_show_all_inspection_reports);
                setViewMaintenanceReport(res.data.can_view_maintenance_reports);
                setAddMaintenanceReport(res.data.can_add_maintenance_reports);
                setEditMaintenanceReport(res.data.can_edit_maintenance_reports);
                setDelMaintenanceReport(res.data.can_delete_maintenance_reports);
                setViewRepairReport(res.data.can_view_repair_reports);
                setAddRepairReport(res.data.can_add_repair_reports);
                setEditRepairReport(res.data.can_edit_repair_reports);
                setDelRepairReport(res.data.can_delete_repair_reports);
                setViewTask(res.data.can_view_task);
                setAddTask(res.data.can_add_task);
                setEditTask(res.data.can_edit_task);
                setDelTask(res.data.can_delete_task);
                if (res.data.can_view_users === true && res.data.can_view_inventory === true  && res.data.can_view_inspection_reports === true 
                    && res.data.can_add_inspection_reports === true
                    && res.data.can_edit_inspection_reports === true && res.data.can_show_all_inspection_reports === true){
                        setPermissionLevel("manager");
                    }
                else if (res.data.can_view_users === false && res.data.can_view_inventory === true && res.data.can_view_inspection_reports === true 
                    && res.data.can_add_inspection_reports === true
                    && res.data.can_edit_inspection_reports === true && res.data.can_show_all_inspection_reports === true){
                        setPermissionLevel("technician");
                    }
                else if (res.data.can_view_users === false && res.data.can_view_inventory === false && res.data.can_view_inspection_reports === true 
                    && res.data.can_add_inspection_reports === true
                    && res.data.can_edit_inspection_reports === false && res.data.can_show_all_inspection_reports === false){
                        setPermissionLevel("driver");
                    }
                else if (res.data.can_view_users === false && res.data.can_view_inventory === false && res.data.can_view_inspection_reports === true 
                    && res.data.can_add_inspection_reports === false
                    && res.data.can_edit_inspection_reports === false && res.data.can_show_all_inspection_reports === true){
                        setPermissionLevel("viewer");
                    }
                onClick('displayBasic')
            })
            .catch((err) => {
                console.log("permission err:");
                console.log(err.response);
            });
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
            setViewMaintenanceReport(true);
            setAddMaintenanceReport(true);
            setEditMaintenanceReport(true);
            setDelMaintenanceReport(true);
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

            setViewMaintenanceReport(true);
            setAddMaintenanceReport(true);
            setEditMaintenanceReport(true);
            setDelMaintenanceReport(true);
            setViewRepairReport(true);
            setAddRepairReport(true);
            setEditRepairReport(true);
            setDelRepairReport(true);
            setViewTask(true);
            setAddTask(true);
            setEditTask(true);
            setDelTask(true);
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

            setViewMaintenanceReport(true);
            setAddMaintenanceReport(true);
            setEditMaintenanceReport(true);
            setDelMaintenanceReport(true);
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

            setViewMaintenanceReport(true);
            setAddMaintenanceReport(true);
            setEditMaintenanceReport(true);
            setDelMaintenanceReport(true);
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

    const updateLocalPermission = () => {
        let token = localStorage.getItem("token");
        let user = localStorage.getItem("username");
        let username = selectedUser.username;
        if(user !== username){

        } else {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            };
    
            axios
                .get(process.env.REACT_APP_SERVER_NAME + 'careta/permission/' + username + '/', config)
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
                    res.data.can_show_all_inspection_reports ? localStorage.setItem('viewAllInspectionReport', "true") : localStorage.setItem('viewAllInspectionReport', "false")
                    
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
            "can_delete_users": delUsers
        });
        
        axios
            .put(process.env.REACT_APP_SERVER_NAME + 'careta/permission/' + username + '/user/', body, config)
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
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        };

        // Request Body
        const body = JSON.stringify({
            "user": username,
            "can_view_inventory": viewInventory,
            "can_add_inventory": addInventory,
            "can_edit_inventory": editInventory,
            "can_delete_inventory": delInventory
        });
        
        axios
            .put(process.env.REACT_APP_SERVER_NAME + 'careta/permission/' + username + '/inventory/', body, config)
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
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        };

        // Request Body
        const body = JSON.stringify({
            "user": username,
            "can_view_inspection_reports": viewInspectionReport,
            "can_add_inspection_reports": addInspectionReport,
            "can_edit_inspection_reports": editInspectionReport,
            "can_show_all_inspection_reports": viewAllInspectionReport
        });
        
        axios
            .put(process.env.REACT_APP_SERVER_NAME + 'careta/permission/' + username + '/inspection/', body, config)
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
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        };

        // Request Body
        const body = JSON.stringify({
            "user": username,
            "can_view_maintenance_reports": viewMaintenanceReport,
            "can_add_maintenance_reports": addMaintenanceReport,
            "can_edit_maintenance_reports": editMaintenanceReport,
            "can_delete_maintenance_reports": delMaintenanceReport
        });
        
        axios
            .put(process.env.REACT_APP_SERVER_NAME + 'careta/permission/' + username + '/maintenance/', body, config)
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
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        };

        // Request Body
        const body = JSON.stringify({
            "user": username,
            "can_view_repair_reports": viewRepairReport,
            "can_add_repair_reports": addRepairReport,
            "can_edit_repair_reports": editRepairReport,
            "can_delete_repair_reports": delRepairReport
        });
        
        axios
            .put(process.env.REACT_APP_SERVER_NAME + 'careta/permission/' + username + '/repair/', body, config)
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
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        };

        // Request Body
        const body = JSON.stringify({
            "user": username,
            "can_view_task": viewTask,
            "can_add_task": addTask,
            "can_edit_task": editTask,
            "can_delete_task": delTask
        });
        
        axios
            .put(process.env.REACT_APP_SERVER_NAME + 'careta/permission/' + username + '/task/', body, config)
            .then((res) => {
                //console.log('succ permission task: ');
                //console.log(res.data)
                onHide('displayBasic')
                toast.current.show({ severity: 'success', summary: 'Update Successfully', detail: 'User details updated.', life: 3000 });
                getUsers();
                updateLocalPermission();
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
        dialogFuncMap[`${name}`](true);
    }

    const confirmDelete = (name, values) => {
        setSelectedUser(values);
        if (values != null) {
            setWord(values.full_name);
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
            .delete(process.env.REACT_APP_SERVER_NAME + 'careta/users/' + username + '/', config)
            .then((res) => {
                //console.log('succ delete user: ');
                //console.log(res.data)
                toast.current.show({ severity: 'success', summary: 'Delete Successfully', detail: 'User deleted.', life: 5000 });
                getUsers();
                setSelectedUser(null);
            })
            .catch((err) => {
                console.log('err delete user: ');
                console.log(err.response)
                toast.current.show({ severity: 'error', summary: 'Delete User Error', detail: 'Something went wrong.', life: 5000 });
            });
    }

    const renderHeader = () => {
        return (
            <div style={{paddingTop:'1%'}}><h5><b>USER MANAGEMENT</b></h5></div>
        );
    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" className="p-button-danger" onClick={() => onHideDelete(name)} autoFocus />
            </div>
        );
    }

    const actionBody = (rowData) => {
        return (
            localStorage.getItem("deleteUsers") === "true" ? <center>
            <Button icon="pi pi-times" className="p-button-rounded p-button-danger" onClick={() => confirmDelete('displayBasic2', rowData)}/> </center>
            : <center>
            <Button icon="pi pi-times" className="p-button-rounded p-button-danger" onClick={() => confirmDelete('displayBasic2', rowData)} disabled/> </center>
        );
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
        if (isChanged) {
            refreshPage();
            setIsChanged(false);
        } else {
            
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
                        <Button label="Edit" icon="pi pi-pencil" className="p-mr-2" onClick={() => getUserData()}/>
                        :
                        <Button label="Edit" icon="pi pi-pencil" className="p-mr-2" onClick={() => onClick('displayBasic')} disabled/> }
                    </div>
                    <div className="p-col-12 p-md-6">

                    </div>
                    <div className="p-col-12 p-lg-4 p-md-4 p-sm-4">
                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText type="search" placeholder="Search User" value={seacrhUser} onChange={(event) => filterUser(event)}/>
                        </span>
                    </div>
                </div>
            </div>

            <div className="p-col-12">
                <DataTable ref={dt} header={renderHeader()} value={users} className="p-datatable-sm" resizableColumns columnResizeMode="expand"
                    selectionMode="single" selection={selectedUser} onSelectionChange={e => setSelectedUser(e.value)}
                    emptyMessage="No data found">
                    <Column field="full_name" header="Name" style={{ paddingLeft: '2%' }}></Column>
                    <Column body={actionBody} header="Action (Delete)" style={{ textAlign: 'center' }}></Column>
                </DataTable>
                <Paginator first={first} rows={rows} totalRecords={totalCount} onPageChange={onPageChange}></Paginator>
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

                    <div className="p-grid">
                        <div className="p-col-12 p-md-9"> </div>
                        <div className="p-col-12 p-md-3" style={{ marginTop: '2%', paddingRight: '2%' }}>
                        <Button label="SAVE CHANGES" className="p-button-md p-shadow-4 p-button-rounded" onClick={saveChanges} />
                        </div>
                    </div>
                </div>
            </Dialog>

            <Dialog header="Confirm Delete" visible={displayBasic2} style={{ width: '310px' }} footer={renderFooter('displayBasic2')} onHide={() => onHide('displayBasic2')}>
                Are you sure to delete this record of <label style={{ fontWeight: 'bold' }}> {word} </label> ?
            </Dialog>
            
        </div>
    )

}

export default EditDeleteUser;
