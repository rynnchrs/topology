import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import axios from "axios";

export const AppProfile = (props) => {

    const [expanded, setExpanded] = useState(false);
    const toast = useRef(null);

    const onClick = (event) => {
        setExpanded(prevState => !prevState);
        event.preventDefault();
    }

    const logout = () => {
        //alert("logoout");
        let token = localStorage.getItem("token");
        const refresh_token = token; 

        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        };

        const body = JSON.stringify({ refresh_token });
        console.log('body: ' + body);

        axios
            .post('http://127.0.0.1:8000/api/logout/blacklist/', body, config)
            .then((res) => {
                console.log('logout success');
                console.log(res.data)
            })
            .catch((err) => {
                console.log('logout error');
                console.log(err.response)

            });

        localStorage.removeItem("token");
        toast.current.show({ severity: 'success', summary: 'Logout Successfully', detail: 'Account is ready to use.', life: 3000 });
        window.location.href = '/';
    }

    return (
        <div className="layout-profile">
            <Toast ref={toast} />
            <div>
                <img src="assets/layout/images/profile.png" alt="Profile" />
            </div>
            <button className="p-link layout-profile-link" onClick={onClick}>
                <span className="username">Ryann Ang</span>
                <i className="pi pi-fw pi-cog" />
            </button>
            <CSSTransition classNames="p-toggleable-content" timeout={{ enter: 1000, exit: 450 }} in={expanded} unmountOnExit>
                <ul className={classNames({ 'layout-profile-expanded': expanded })}>
                    <li><button type="button" className="p-link"><i className="pi pi-fw pi-user" /><span>Account</span></button></li>
                    <li><button type="button" className="p-link"><i className="pi pi-fw pi-inbox" /><span>Notifications</span><span className="menuitem-badge">2</span></button></li>
                    <li><button type="button" className="p-link" onClick={logout}><i className="pi pi-fw pi-power-off" /><span>Logout</span></button></li>
                </ul>
            </CSSTransition>
        </div>
    );

}

export default AppProfile;
