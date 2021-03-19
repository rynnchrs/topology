import axios from 'axios';
// import { createMessage, returnErrors } from './messages';
import { createMessage } from './messages';

import {
    GET_ERRORS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
} from './types';

// LOGIN USER
export const login = (username, password) => (dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Request Body
    const body = JSON.stringify({ username, password });

    axios
        .post('http://127.0.0.1:8000/api/login/', body, config)
        .then((res) => {
            //console.log('login token: ' + res.data.access)
            localStorage.setItem('username', username);
            localStorage.setItem('token', res.data.access);
            try {
                let token = localStorage.getItem("token");
                let username = localStorage.getItem("username");
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                };
            
                axios
                .get('http://127.0.0.1:8000/api/permission/' + username + '/', config)
                .then((res) => {
                    //console.log("permission login:");
                    //console.log(res.data);
                    
                    // if (res.data.can_view_users) {
                    //     console.log("auth can view users");
                    //     localStorage.setItem('viewUsers', "true");
                    // } else {
                    //     console.log("auth cant view users");
                    //     localStorage.setItem('viewUsers', "false");
                    // }
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

                })
                .catch((err) => {
                    console.log("permission err:");
                    console.log(err.response);
                });
            } catch (e){
                console.log("trycattcherr:");
                console.log(e.response);
            }
            dispatch(createMessage({ okayLogin: "okay" }));
            // i added delay 1.5second to make dispatch above perform the toast before the dispatch below
            setTimeout(() => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data,
                });
            }, 1000);
        })
        .catch((err) => {
            console.log(err.response);
            const errors = {
                msg: err.response.data,
                status: err.response.status
            }
            //dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                //type: LOGIN_FAIL,
                type: GET_ERRORS,
                payload: errors
            });
            dispatch({
                type: LOGIN_FAIL,
                payload: errors
            });
        });
};
