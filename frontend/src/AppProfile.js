import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { Toast } from 'primereact/toast';
import axios from "axios";

export const AppProfile = () => {

    const [expanded, setExpanded] = useState(false);
    const toast = useRef(null);
    
    const [userData, setUserData] = useState();

    // useEffect(() => {
    //     let token = localStorage.getItem("token");
    //     let username = localStorage.getItem("username");
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + token,
    //         },
    //     };

    //     axios
    //         .get(process.env.REACT_APP_SERVER_NAME + 'careta/users/' + username + '/', config)
    //         .then((res) => {
    //             localStorage.setItem('myfirst', res.data.user_info.full_name);
    //             setUserData(localStorage.getItem("myfirst"))
    //         })
    //         .catch((err) => {
    //             console.log("get users err:")
    //             console.log(err.response);
    //         });
    // },[]);
    
    const onClick = (event) => {
        setExpanded(prevState => !prevState);
        event.preventDefault();
    }
    
    const logout = () => {
        let token = localStorage.getItem("token");
        let refreshToken = localStorage.getItem("refreshToken");

        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        };

        const body = { "refresh": refreshToken }; 
        //console.log('body: ' + body);

        axios
            .post(process.env.REACT_APP_SERVER_NAME + 'careta/logout/blacklist/', body, config)
            .then((res) => {
                console.log('logout success');
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("myfirst");
                localStorage.removeItem("myimage");

                localStorage.removeItem("viewUsers"); localStorage.removeItem("addUsers");
                localStorage.removeItem("editUsers"); localStorage.removeItem("deleteUsers");
                localStorage.removeItem("viewInventory"); localStorage.removeItem("addInventory");
                localStorage.removeItem("editInventory"); localStorage.removeItem("deleteInventory");
                localStorage.removeItem("viewInspectionReport"); localStorage.removeItem("addInspectionReport");
                localStorage.removeItem("editInspectionReport"); localStorage.removeItem("viewAllInspectionReport");
                localStorage.removeItem("viewMaintenanceReport"); localStorage.removeItem("addMaintenanceReport");
                localStorage.removeItem("editMaintenanceReport"); localStorage.removeItem("deleteMaintenanceReport");
                localStorage.removeItem("viewRepairReport"); localStorage.removeItem("addRepairReport");
                localStorage.removeItem("editRepairReport"); localStorage.removeItem("deleteRepairReport");
                localStorage.removeItem("viewTask"); localStorage.removeItem("addTask");
                localStorage.removeItem("editTask"); localStorage.removeItem("deleteTask");
                localStorage.removeItem("viewIR"); localStorage.removeItem("addIR");
                localStorage.removeItem("editIR"); localStorage.removeItem("deleteIR");
                localStorage.removeItem("viewChecklist"); localStorage.removeItem("addChecklist");
                localStorage.removeItem("editChecklist"); localStorage.removeItem("deleteChecklist");
                toast.current.show({ severity: 'success', summary: 'Logout Successful', detail: 'You are now logged out.', life: 3000 });
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500)
            })
            .catch((err) => {
                console.log(err.response);
            });

        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("myfirst");
        localStorage.removeItem("myimage");

        localStorage.removeItem("viewUsers"); localStorage.removeItem("addUsers");
        localStorage.removeItem("editUsers"); localStorage.removeItem("deleteUsers");
        localStorage.removeItem("viewInventory"); localStorage.removeItem("addInventory");
        localStorage.removeItem("editInventory"); localStorage.removeItem("deleteInventory");
        localStorage.removeItem("viewInspectionReport"); localStorage.removeItem("addInspectionReport");
        localStorage.removeItem("editInspectionReport"); localStorage.removeItem("viewAllInspectionReport");
        localStorage.removeItem("viewMaintenanceReport"); localStorage.removeItem("addMaintenanceReport");
        localStorage.removeItem("editMaintenanceReport"); localStorage.removeItem("deleteMaintenanceReport");
        localStorage.removeItem("viewRepairReport"); localStorage.removeItem("addRepairReport");
        localStorage.removeItem("editRepairReport"); localStorage.removeItem("deleteRepairReport");
        localStorage.removeItem("viewTask"); localStorage.removeItem("addTask");
        localStorage.removeItem("editTask"); localStorage.removeItem("deleteTask");
        localStorage.removeItem("viewIR"); localStorage.removeItem("addIR");
        localStorage.removeItem("editIR"); localStorage.removeItem("deleteIR");
        localStorage.removeItem("viewChecklist"); localStorage.removeItem("addChecklist");
        localStorage.removeItem("editChecklist"); localStorage.removeItem("deleteChecklist");
        // toast.current.show({ severity: 'success', summary: 'Logout Successful', detail: 'You are now logged out.', life: 3000 });
        setTimeout(() => {
            window.location.href = '/';
        }, 1500)
        
    }
 
    return (
        <div className="layout-profile">
            <Toast ref={toast} />
            <div className="img-profile">
                <img src={localStorage.getItem("myimage")} alt="Profile" />
            </div>
            <div>
                {/* <h5 style={{color:'white'}}>{userData}</h5> */}
                <h5 style={{color:'white'}}>{localStorage.getItem("myfirst")}</h5>
            </div>
            <button className="p-link layout-profile-link pi pi-fw pi-cog" onClick={onClick}></button>
            <CSSTransition classNames="p-toggleable-content" timeout={{ enter: 1000, exit: 450 }} in={expanded} unmountOnExit>
                <ul className={classNames({ 'layout-profile-expanded': expanded })}>
                    <li><button type="button" className="p-link" onClick={logout}><i className="pi pi-fw pi-power-off" /><span>Logout</span></button></li>
                </ul>
            </CSSTransition>
        </div>
    );
    
}

export default AppProfile;
