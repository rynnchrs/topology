import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppProfile } from './AppProfile';
import { AppConfig } from './AppConfig';

import PrimeReact from 'primereact/utils';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import './layout/flags/flags.css';
import './layout/layout.scss';
import './App.scss';
import { Dashboard } from './components/Dashboard';
import { Vehicles } from './components/Vehicles';
import { DriverInspectionReport } from './components/DriverInspectionReport';

import { Register } from './components/Register';
import { EditDeleteUser } from './components/EditDeleteUser';

import  DriverRecordForms from './components/DriverRecordForms';
import  VehiclesGPS from './components/VehiclesGPS';
import axios from "axios";
import jwt_decode from "jwt-decode";

import { Toast } from 'primereact/toast';


const App = () => {

    const [layoutMode, setLayoutMode] = useState('static');
    const [layoutColorMode, setLayoutColorMode] = useState('dark')
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(false);
    const sidebar = useRef();
    let menuClick = false;

    const [counter, setCounter] = useState(0);
    const toast = useRef(null);

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, 'body-overflow-hidden');
        }
        else {
            removeClass(document.body, 'body-overflow-hidden');
        }
    }, [mobileMenuActive]);

    useEffect(() => {
        let token = localStorage.getItem("token");
        let decoded = jwt_decode(token);
        const dNow = new Date();
        const d = new Date(0);
        d.setUTCSeconds(decoded.exp);
        const remainingMinutes = Math.round(getDifferenceInMinutes(dNow, d));
        if (remainingMinutes <= 0) {
            localStorage.clear();
            window.location.reload();
        } else {
            //console.log("remain: ", remainingMinutes);
        }
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCounter(counter + 1);
            console.log("cntr: ",counter);
            let token = localStorage.getItem("token");
            let refreshToken = localStorage.getItem("refreshToken");
            // console.log("token: ", token);
            // console.log("refreshtoken: ", refreshToken);
            
            const body = { "refresh": refreshToken }; 
            //console.log("body:", body);

            let decoded = jwt_decode(token);
            //console.log("dcd: ", decoded);
            const dNow = new Date();
            const d = new Date(0);
            d.setUTCSeconds(decoded.exp);
            // console.log("dateNow: ", dNow);
            // console.log("dcdexp: ", d);
            // console.log("remaining: ",getDifferenceInMinutes(dNow, d));
            const remainingMinutes = Math.round(getDifferenceInMinutes(dNow, d));
            // console.log("remaining: ", remainingMinutes);
            if (remainingMinutes === 1){
                console.log("1 minute left");
                console.log("diff: ", remainingMinutes);
                console.log("old a: ", token);
                axios
                    .post(process.env.REACT_APP_SERVER_NAME + 'careta/token/refresh/', body)
                    .then((res) => {  
                        console.log("res refresh:", res.data);
                        localStorage.setItem('token', res.data.access);
                        console.log("new a: ", localStorage.getItem("token"));
                        setCounter(0);
                    })
                    .catch((error) => {
                        console.log('error refresh: ');
                        console.log(error);
                    });
            } else {
                console.log("remaining: ", remainingMinutes);
            }
          }, 5000)
        
          return () => clearInterval(intervalId);
    }, [counter]);

    const getDifferenceInMinutes = (date1, date2) => {
        const diffInMs = Math.round(date2 - date1);
        return diffInMs / (1000 * 60);
    }

    const sidebarMenu = [];
    const sidebarSubMenu1 = [];
    const sidebarSubMenu2 = [];
    const sidebarSubMenu3 = [];
    
    sidebarMenu.push({label: 'Dashboard', icon: 'pi pi-fw pi-home', command: () => {window.location = '#/'}});
    //users permission
    if (localStorage.getItem("addUsers") === "true") {
        sidebarSubMenu1.push({ label: 'Register User', icon: 'pi pi-user-plus', to: '/register'});
    }
    if (localStorage.getItem("viewUsers") === "true" || localStorage.getItem("editUsers") === "true" || localStorage.getItem("deleteUsers") === "true") {
        sidebarSubMenu1.push({ label: 'Edit-Delete user', icon: 'pi pi-user-edit', to: '/editdeleteuser'});
    }
    if (localStorage.getItem("viewUsers") === "true" || localStorage.getItem("addUsers") === "true" || localStorage.getItem("editUsers") === "true" || localStorage.getItem("deleteUsers") === "true") {
        sidebarMenu.push({label: 'Users Management', icon: 'pi pi-user', items: sidebarSubMenu1});
    } else {
        //console.log("permission data none");
    }

    //inventory permission
    if (localStorage.getItem("viewInventory") === "true") {
        sidebarSubMenu2.push({label: 'Vehicles GPS', icon: 'pi pi-file', to: '/vehiclesgps' });
    }
    if (localStorage.getItem("viewInventory") === "true" || localStorage.getItem("addInventory") === "true" || localStorage.getItem("editInventory") === "true" || localStorage.getItem("deleteInventory") === "true") {
        sidebarSubMenu2.push({label: 'Vehicles Inventory', icon: 'pi pi-file', to: '/vehicles' });
    }
    // sidebarSubMenu2.push({label: 'Vehicles Inventory', icon: 'pi pi-file', to: '/vehicles' });
    // sidebarSubMenu2.push({label: 'Vehicles GPS', icon: 'pi pi-file', to: '/vehiclesgps' });
    if (localStorage.getItem("viewInventory") === "true" || localStorage.getItem("addInventory") === "true" || localStorage.getItem("editInventory") === "true" || localStorage.getItem("deleteInventory") === "true") {
        sidebarMenu.push({label: 'Vehicles Info', icon: 'pi pi-fw pi-align-left', items: sidebarSubMenu2});
    } else {
        //console.log("permission data none");
    }

    //inspection permission
    if (localStorage.getItem("addInspectionReport") === "true") {
        sidebarSubMenu3.push({label: 'Driver Inspection Report', icon: 'pi pi-file', to: '/driverinspectionreport' });
    }
    if (localStorage.getItem("viewInspectionReport") === "true" || localStorage.getItem("editInspectionReport") === "true" || localStorage.getItem("deleteInspectionReport") === "true") {
        sidebarSubMenu3.push({label: 'Driver Inspection Records', icon: 'pi pi-file', to: '/driverrecordforms' });
    }
    
    if (localStorage.getItem("viewInspectionReport") === "true" || localStorage.getItem("addInspectionReport") === "true" || localStorage.getItem("editInspectionReport") === "true" || localStorage.getItem("deleteInspectionReport") === "true") {
        sidebarMenu.push({label: 'Inspection Management', icon: 'pi pi-file', items: sidebarSubMenu3});
    } else {
        //console.log("permission data none");
    }

    if (localStorage.getItem("viewTask") === "true" || localStorage.getItem("addTask") === "true" || localStorage.getItem("editTask") === "true" || localStorage.getItem("deleteTask") === "true") {
        sidebarMenu.push({label: 'Job Schedule', icon: 'pi pi-fw pi-calendar'});
    } else {
        //console.log("permission data none");
    }

    //sidebarMenu.push({label: 'Vehicles Info', icon: 'pi pi-fw pi-align-left', to: '/vehicles'});
    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    }

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value)
    }

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode)
    }

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode)
    }

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
        menuClick = false;
    }

    const onToggleMenu = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                setOverlayMenuActive(prevState => !prevState);
            }
            else if (layoutMode === 'static') {
                setStaticMenuInactive(prevState => !prevState);
            }
        }
        else {
            setMobileMenuActive(prevState => !prevState);
        }
        event.preventDefault();
    }

    const onSidebarClick = () => {
        menuClick = true;
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    }

    const addClass = (element, className) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const isDesktop = () => {
        return window.innerWidth > 1024;
    }

    const isSidebarVisible = () => {
        if (isDesktop()) {
            if (layoutMode === 'static')
                return !staticMenuInactive;
            else if (layoutMode === 'overlay')
                return overlayMenuActive;
            else
                return true;
        }
        return true;
    }

    const logo =  'assets/layout/images/careta-logo.png' ;

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false
    });

    const sidebarClassName = classNames('layout-sidebar', {
        'layout-sidebar-dark': layoutColorMode === 'dark',
        'layout-sidebar-light': layoutColorMode === 'light'
    });

    return (
        
        <div className={wrapperClass} onClick={onWrapperClick}>
            <Toast ref={toast} />
            <AppTopbar onToggleMenu={onToggleMenu} />

            <CSSTransition classNames="layout-sidebar" timeout={{ enter: 200, exit: 200 }} in={isSidebarVisible()} unmountOnExit>
                <div ref={sidebar} className={sidebarClassName} onClick={onSidebarClick}>
                    <div className="layout-logo">
                        <img alt="Logo" src={logo} />
                    </div>
                    <AppProfile />
                    {/*<AppMenu model={menu} onMenuItemClick={onMenuItemClick} />*/}
                    <AppMenu model={sidebarMenu} onMenuItemClick={onMenuItemClick} />
                </div>
            </CSSTransition>

            <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
                layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

            <div className="layout-main">
                <Route path="/" exact component={Dashboard} />
                <Route path="/register" exact component={Register} />
                <Route path="/editdeleteuser" exact component={EditDeleteUser} />
                <Route path="/vehicles" exact component={Vehicles} />
                <Route path="/vehiclesgps" exact component={VehiclesGPS} />
                <Route path="/driverinspectionreport" exact component={DriverInspectionReport} />
                <Route path="/driverrecordforms" exact component={DriverRecordForms} />
            </div>

            <AppFooter />

        </div>
               
    );

}

export default App;
