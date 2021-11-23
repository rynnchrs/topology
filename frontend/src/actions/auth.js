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
        .post(process.env.REACT_APP_SERVER_NAME + 'careta/login/', body, config)
        .then((res) => {
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('token', res.data.access);
            localStorage.setItem('refreshToken', res.data.refresh);
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
                    
                    res.data.can_view_repair_reports ? localStorage.setItem('viewRepairReport', "true") : localStorage.setItem('viewRepairReport', "false")
                    res.data.can_add_repair_reports ? localStorage.setItem('addRepairReport', "true") : localStorage.setItem('addRepairReport', "false")
                    res.data.can_edit_repair_reports ? localStorage.setItem('editRepairReport', "true") : localStorage.setItem('editRepairReport', "false")
                    res.data.can_delete_repair_reports ? localStorage.setItem('deleteRepairReport', "true") : localStorage.setItem('deleteRepairReport', "false")

                    res.data.can_view_task ? localStorage.setItem('viewTask', "true") : localStorage.setItem('viewTask', "false")
                    res.data.can_add_task ? localStorage.setItem('addTask', "true") : localStorage.setItem('addTask', "false")
                    res.data.can_edit_task ? localStorage.setItem('editTask', "true") : localStorage.setItem('editTask', "false")
                    res.data.can_delete_task ? localStorage.setItem('deleteTask', "true") : localStorage.setItem('deleteTask', "false")

                    res.data.can_view_ir ? localStorage.setItem('viewIR', "true") : localStorage.setItem('viewIR', "false")
                    res.data.can_add_ir ? localStorage.setItem('addIR', "true") : localStorage.setItem('addIR', "false")
                    res.data.can_edit_ir ? localStorage.setItem('editIR', "true") : localStorage.setItem('editIR', "false")
                    res.data.can_delete_ir ? localStorage.setItem('deleteIR', "true") : localStorage.setItem('deleteIR', "false")

                    res.data.can_view_checklist ? localStorage.setItem('viewChecklist', "true") : localStorage.setItem('viewChecklist', "false")
                    res.data.can_add_checklist ? localStorage.setItem('addChecklist', "true") : localStorage.setItem('addChecklist', "false")
                    res.data.can_edit_checklist ? localStorage.setItem('editChecklist', "true") : localStorage.setItem('editChecklist', "false")
                    res.data.can_delete_checklist ? localStorage.setItem('deleteChecklist', "true") : localStorage.setItem('deleteChecklist', "false")

                })
                .catch((err) => {

                });

                axios
                .get(process.env.REACT_APP_SERVER_NAME + 'image/user-image/' + username +'/', config)
                .then((res) => {
                    localStorage.setItem('myimage', process.env.REACT_APP_SERVER_NAME + res.data.image.substring(1));
                })
                .catch((err) => {
                    localStorage.setItem('myimage', "assets/layout/images/avatar.jpg");
                });
            } catch (e){

            }
            dispatch(createMessage({ okayLogin: "okay" }));
            //added delay 1second to make dispatch above perform the toast before the dispatch below
            setTimeout(() => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data,
                });
            }, 1000);
        })
        .catch((err) => {
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
